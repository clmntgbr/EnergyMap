import Station from '#models/station'
import FileSystem from '#services/file_system'
import GasUpdateService from '#services/gas_update_service'
import env from '#start/env'
import { BaseCommand } from '@adonisjs/core/ace'
import emitter from '@adonisjs/core/services/emitter'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import cliProgress from 'cli-progress'
import { DateTime } from 'luxon'
import { promises as fs } from 'node:fs'

export default class GasUpdateYear extends BaseCommand {
  static commandName = 'gas:update:year'
  static description = 'This command parse the JSON gas file & parse it'

  static options: CommandOptions = {
    startApp: true,
    allowUnknownFlags: false,
    staysAlive: false,
  }

  years = ['2023']
  validPrefixes = ['75', '94', '91', '92', '93']

  async run() {
    const gasUpdateService = new GasUpdateService()
    const fileSystem = new FileSystem()

    const gasPublicPath = env.get('GAS_PUBLIC_PATH', '')

    if (!gasPublicPath) {
      return
    }

    for (const year of this.years) {
      const gasJson = `${year}.json`

      if (!fileSystem.exist(gasPublicPath, gasJson)) {
        return
      }

      const content = await fs.readFile(`${gasPublicPath}/${gasJson}`, 'utf8')
      const datas = JSON.parse(content)

      const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic)
      progressBar.start(datas.length, 0)

      for (const [index, data] of datas.entries()) {
        if (!this.validPrefixes.includes(data.$.id.substring(0, 2))) {
          continue
        }

        progressBar.update(index + 1)

        //TODO remettre la création si n'existe pas

        let station = await Station.findBy('stationId', data.$.id)

        if (!station) {
          continue
        }

        await station.load('prices')
        for (const priceInMap of station.prices) {
          await priceInMap.load('type')
        }

        if (data.prix.length <= 1) {
          continue
        }

        for (const price of data.prix ?? []) {
          const date = DateTime.fromFormat(price.$.maj, "yyyy-MM-dd'T'HH:mm:ss")
          const type = await gasUpdateService.firstOrCreateType(price)

          emitter.emit('price:create', [
            {
              stationId: null,
              stationRelated: data.$.id,
              datetimestamp: date.toSeconds().toString(),
              value: price.$.valeur,
              typeId: type.id,
            },
          ])
        }
      }
      progressBar.stop()
    }
  }
}

import FileSystem from '#services/file_system'
import GasUpdateService from '#services/gas_update_service'
import env from '#start/env'
import { BaseCommand } from '@adonisjs/core/ace'
import emitter from '@adonisjs/core/services/emitter'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import cliProgress from 'cli-progress'
import { DateTime } from 'luxon'
import { promises as fs } from 'node:fs'

export default class GasUpdate extends BaseCommand {
  static commandName = 'gas:update'
  static description = 'This command parse the JSON gas file & parse it'

  static options: CommandOptions = {
    startApp: true,
    allowUnknownFlags: false,
    staysAlive: false,
  }

  // validPrefixes = ['75', '94', '91', '92', '93']
  // validPrefixes = ['94']

  async run() {
    const gasUpdateService = new GasUpdateService()
    const fileSystem = new FileSystem()

    const gasJson = env.get('GAS_JSON', '')
    const gasPublicPath = env.get('GAS_PUBLIC_PATH', '')

    if (!gasJson || !gasPublicPath) {
      return
    }

    if (!fileSystem.exist(gasPublicPath, gasJson)) {
      return
    }

    const content = await fs.readFile(`${gasPublicPath}/${gasJson}`, 'utf8')
    const datas = JSON.parse(content)

    const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic)
    progressBar.start(datas.length, 0)

    for (const [index, data] of datas.entries()) {
      // if (!this.validPrefixes.includes(data.$.id.substring(0, 2))) {
      //   continue
      // }

      progressBar.update(index + 1)

      const address = await gasUpdateService.firstOrCreateAddress(data)
      let station = await gasUpdateService.firstOrCreateStation(data, address)
      station = await gasUpdateService.addStationServices(station, data.services.shift().service)

      await station.load('prices')
      for (const priceInMap of station.prices) {
        await priceInMap.load('type')
      }

      for (const price of data.prix ?? []) {
        const date = DateTime.fromFormat(price.$.maj, 'yyyy-MM-dd HH:mm:ss')
        const type = await gasUpdateService.firstOrCreateType(price)

        const hasToBeCreated = await gasUpdateService.priceHasToBeCreated(date, station, type)

        if (!hasToBeCreated.needsUpdate) {
          continue
        }

        emitter.emit('price:create', [
          {
            stationId: station.id,
            stationRelated: data.$.id,
            datetimestamp: date.toSeconds().toString(),
            value: price.$.valeur,
            typeId: type.id,
          },
        ])

        emitter.emit('price:update', [
          {
            priceId: hasToBeCreated.priceId,
          },
        ])
      }
    }

    progressBar.stop()
  }
}

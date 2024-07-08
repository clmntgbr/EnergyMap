import FileSystem from '#services/file_system'
import GasUpdateService from '#services/gas_update_service'
import env from '#start/env'
import { BaseCommand } from '@adonisjs/core/ace'
import emitter from '@adonisjs/core/services/emitter'
import type { CommandOptions } from '@adonisjs/core/types/ace'
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

  validPrefixes = ['75', '94', '91', '92', '93', '95']

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

    for (const data of datas) {
      if (!this.validPrefixes.includes(data.$.id.substring(0, 2))) {
        continue
      }

      const address = await gasUpdateService.updateOrCreateAddress(data)
      const station = await gasUpdateService.updateOrCreateStation(data, address)

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
  }
}

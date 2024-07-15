import Station from '#models/station'
import Geocoding from '#services/geocoding'
import PositionStackApi from '#services/position_stack_api'
import { BaseCommand } from '@adonisjs/core/ace'
import emitter from '@adonisjs/core/services/emitter'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import { StationStatus } from '@energy_map/enums/station_status.js'
import cliProgress from 'cli-progress'

export default class StationGeocoding extends BaseCommand {
  static commandName = 'station:geocoding'
  static description = ''

  static options: CommandOptions = {
    startApp: true,
    allowUnknownFlags: false,
    staysAlive: false,
  }

  async run() {
    const positionStackApi = new PositionStackApi()
    const geocoding = new Geocoding()

    const stations = await Station.findManyBy('status', StationStatus.CREATED)

    const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic)
    progressBar.start(stations.length, 0)

    for (const [index, station] of stations.entries()) {
      await station.load('address')
      const response = await positionStackApi.reverse(station.address)

      progressBar.update(index + 1)

      if (response.status === false) {
        emitter.emit('status:update', [
          { stationUuid: station.uuid, status: StationStatus.ADDRESS_ERROR_FORMATED },
        ])
        continue
      }

      geocoding.parse(response, station)
    }

    progressBar.stop()
  }
}

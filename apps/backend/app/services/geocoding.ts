import Station from '#models/station'
import emitter from '@adonisjs/core/services/emitter'
import { StationStatus } from '@energy_map/enums/station_status.js'

export default class Geocoding {
  async parse(response: any, station: Station) {
    for (const data of response.data?.data.data ?? []) {
      if (data.confidence >= 0.8) {
        return emitter.emit('address:geocoding', [
          {
            station: station,
            address: station.address,
            vicinity: data.label,
            street: data.street,
            number: data.number,
            city: data.locality,
            region: data.region,
            postalCode: data.postal_code,
            country: data.country,
            longitude: data.longitude,
            latitude: data.latitude,
          },
        ])
      }
    }

    emitter.emit('status:update', [
      { stationUuid: station.uuid, status: StationStatus.ADDRESS_ERROR_FORMATED },
    ])
  }
}

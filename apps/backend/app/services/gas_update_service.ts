import Address from '#models/address'
import Station from '#models/station'
import Type from '#models/type'
import StationService from '#services/station'
import { StationType } from '@energy_map/enums/station_type.js'

export default class GasUpdateService {
  async updateOrCreateAddress(data: any): Promise<Address> {
    const searchPayload = {
      stationId: data.$.id,
    }

    const street = data.adresse.shift().replace('Ã', 'E').replace('', '')

    const persistancePayload = {
      stationId: data.$.id,
      vicinity: street,
      street: street,
      city: data.ville.shift(),
      longitude: data.$.longitude,
      latitude: data.$.latitude,
      postalCode: data.$.cp,
    }

    return await Address.updateOrCreate(searchPayload, persistancePayload)
  }

  async firstOrCreateType(price: any): Promise<Type> {
    return Type.firstOrCreate({
      name: price.$.nom,
      reference: price.$.nom
        .toLowerCase()
        .trim()
        .replace(/[\s\W-]+/g, '-')
        .replace(/^-+|-+$/g, ''),
    })
  }

  async updateOrCreateStation(data: any, address: Address): Promise<Station> {
    const stationService = new StationService()

    const searchPayload = {
      stationId: data.$.id,
    }

    const persistancePayload = {
      stationId: data.$.id,
      type: StationType.GAS,
      pop: data.$.pop,
      element: stationService.reduce(data),
      addressId: address.id,
    }

    return await Station.updateOrCreate(searchPayload, persistancePayload)
  }
}

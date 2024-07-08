import Address from '#models/address'
import Station from '#models/station'
import Type from '#models/type'
import StationService from '#services/station'
import { StationType } from '@energy_map/enums/station_type.js'
import { DateTime } from 'luxon'

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
      longitude: data.$.longitude / 100000,
      latitude: data.$.latitude / 100000,
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

  async priceHasToBeCreated(date: DateTime, station: Station, type: Type) {
    for (const price of station.prices) {
      if (price.typeId === type.id) {
        if (Number.parseInt(price.datetimestamp) >= date.toSeconds()) {
          return { needsUpdate: false, priceId: null }
        }
      }
    }

    // Return the ID of the price to update (if any)
    for (const price of station.prices) {
      if (price.typeId === type.id) {
        return { needsUpdate: true, priceId: price.id }
      }
    }

    // If no price found that matches the typeId, indicate that a new price needs to be created
    return { needsUpdate: true, priceId: null }
  }
}

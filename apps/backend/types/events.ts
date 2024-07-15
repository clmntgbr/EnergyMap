import Address from '#models/address'
import Station from '#models/station'

declare module '@adonisjs/core/types' {
  interface EventsList {
    'price:create': [data: EventPriceCreate]
    'price:update': [data: EventPriceUpdate]
    'status:update': [data: EventStatusUpdate]
    'address:geocoding': [data: EventAddressGeocoding]
  }
}

export interface EventPriceCreate {
  stationId: number
  stationRelated: string
  value: string
  datetimestamp: string
  typeId: number
}

export interface EventPriceUpdate {
  priceId: number | null
}

export interface EventStatusUpdate {
  stationUuid: string
  status: string
}

export interface EventAddressGeocoding {
  station: Station
  address: Address
  vicinity: string
  street: string
  number: string | null
  city: string
  region: string
  postalCode: string
  country: string
  longitude: number
  latitude: number
}

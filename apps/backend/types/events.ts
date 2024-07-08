declare module '@adonisjs/core/types' {
  interface EventsList {
    'price:create': [data: EventPriceCreate]
    'price:update': [data: EventPriceUpdate]
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

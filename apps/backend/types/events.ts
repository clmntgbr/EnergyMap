import { DateTime } from 'luxon'

declare module '@adonisjs/core/types' {
  interface EventsList {
    'price:create': [data: EventPriceCreate]
  }
}

export interface EventPriceCreate {
  stationId: string
  date: DateTime
  value: string
  datetimestamp: string
  typeId: number
}

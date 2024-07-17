import Station from '#models/station'
import FilterService from '#services/filter'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

@inject()
export default class StationsController {
  constructor(protected filterService: FilterService) {}

  async getStationByUuid({ request }: HttpContext) {
    const uuid = request.param('uuid')
    const station = await Station.findBy('uuid', uuid)

    await station?.load('address')
    await station?.load('prices', (pricesQuery) => {
      pricesQuery.preload('type')
    })

    return station
  }

  async getStationsMap({ request }: HttpContext) {
    const latitude = Number.parseFloat(request.qs().latitude)
    const longitude = Number.parseFloat(request.qs().longitude)
    const radius = Number.parseFloat(request.qs().radius)
    const type = request.qs().type === 'null' ? null : request.qs().type
    const services = request.qs().service ?? []
    const departments = request.qs().department ?? []

    if (!latitude || !longitude || !radius || !type) {
      return []
    }

    const departmentsFilter = await this.filterService.departments(departments)
    const servicesFilter = await this.filterService.services(services)

    const sql = await db.rawQuery(
      `SELECT
        stations.*,
        ST_Distance(
          ST_MakePoint(addresses.longitude, addresses.latitude)::geography,
          ST_MakePoint(?, ?)::geography
        ) AS distance,
        SUBSTRING(addresses.postal_code, 1, 2) as postalCode
      FROM
        stations
      INNER JOIN
        addresses ON stations.address_id = addresses.id
      INNER JOIN
        prices ON stations.id = prices.station_id
      INNER JOIN
        types ON prices.type_id = types.id
      WHERE
        ST_DWithin(
          ST_MakePoint(addresses.longitude, addresses.latitude)::geography,
          ST_MakePoint(?, ?)::geography,
          ?
        )
        AND types.uuid = ?
        ${departmentsFilter}
        ${servicesFilter}
      ORDER BY
        distance
      LIMIT 500
      `,
      [longitude, latitude, longitude, latitude, radius / 2, type]
    )

    const stationIds = sql.rows.map((row: any) => row.id)

    const stations = await Station.query()
      .whereIn('id', stationIds)
      .preload('address')
      .preload('prices', (pricesQuery) => {
        pricesQuery.preload('type')
      })

    let lowestPriceStationUuid: string | null = null
    let lowestPrice = Number.POSITIVE_INFINITY

    stations.forEach((station) => {
      station.prices.forEach((price) => {
        if (price.type.uuid === type && Number.parseFloat(price.value) < lowestPrice) {
          lowestPrice = Number.parseFloat(price.value)
          lowestPriceStationUuid = station.uuid
        }
      })
    })

    stations.forEach((station) => {
      if (lowestPriceStationUuid === station.uuid) {
        station.hasLowPrices = true
      }
    })

    return stations
  }
}

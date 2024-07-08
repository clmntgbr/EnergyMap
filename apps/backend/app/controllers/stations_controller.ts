import Station from '#models/station'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class StationsController {
  async getStationsMap({ request, response }: HttpContext) {
    const latitude = request.input('latitude')
    const longitude = request.input('longitude')

    if (!latitude || !longitude) {
      response.abort({ message: 'Missing either latitude or longitude.' })
    }

    const sql = await db.rawQuery(
      `SELECT
        stations.*,
        ST_Distance(
          ST_MakePoint(addresses.longitude, addresses.latitude)::geography,
          ST_MakePoint(?, ?)::geography
        ) AS distance
      FROM
        stations
      INNER JOIN
        addresses ON stations.address_id = addresses.id
      WHERE
        ST_DWithin(
          ST_MakePoint(addresses.longitude, addresses.latitude)::geography,
          ST_MakePoint(?, ?)::geography,
          ?
        )
      ORDER BY
        distance
      LIMIT 50
      `,
      [longitude, latitude, longitude, latitude, 500 * 1000]
    )

    const stationIds = sql.rows.map((row: any) => row.id)

    const stations = await Station.query()
      .whereIn('id', stationIds)
      .preload('address')
      .preload('prices', (pricesQuery) => {
        pricesQuery.preload('type')
      })

    return stations
  }
}

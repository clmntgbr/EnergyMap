import Price from '#models/price'
import Station from '#models/station'
import FilterService from '#services/filter'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class PricesController {
  constructor(protected filterService: FilterService) {}

  async getPricesByStationAndYear({ request }: HttpContext) {
    const uuid = request.param('uuid')
    const year = request.param('year')

    const station = await Station.findBy('uuid', uuid)

    if (!station || !year) {
      return []
    }

    const startOfYear = new Date(`${year}-01-01T00:00:00Z`).getTime() / 1000
    const endOfYear = new Date(`${year}-12-31T23:59:59Z`).getTime() / 1000

    return await Price.query()
      .where('stationRelated', station?.stationId.toString())
      .andWhere('datetimestamp', '>=', startOfYear)
      .andWhere('datetimestamp', '<=', endOfYear)
      .preload('type')
      .orderBy('datetimestamp', 'asc')
  }
}

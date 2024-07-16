import Type from '#models/type'
import FilterService from '#services/filter'
import { inject } from '@adonisjs/core'

@inject()
export default class FiltersController {
  constructor(protected filterService: FilterService) {}

  async getTypes() {
    return await Type.all()
  }

  async getServices() {
    return this.filterService.getServicesJson()
  }

  async getDepartments() {
    return this.filterService.getDepartmentsJson()
  }
}

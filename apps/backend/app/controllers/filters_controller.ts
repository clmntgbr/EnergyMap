import Type from '#models/type'
import env from '#start/env'
import { promises as fs } from 'node:fs'

export default class FiltersController {
  async getTypes() {
    return await Type.all()
  }

  async getServices() {
    const servicesJson = env.get('SERVICES_JSON', '')
    const gasPublicPath = env.get('GAS_PUBLIC_PATH', '')

    if (!servicesJson || !gasPublicPath) {
      return
    }

    const content = await fs.readFile(`${gasPublicPath}/${servicesJson}`, 'utf8')
    return JSON.parse(content)
  }

  async getDepartments() {
    const departmentsJson = env.get('DEPARTMENTS_JSON', '')
    const gasPublicPath = env.get('GAS_PUBLIC_PATH', '')

    if (!departmentsJson || !gasPublicPath) {
      return
    }

    const content = await fs.readFile(`${gasPublicPath}/${departmentsJson}`, 'utf8')
    return JSON.parse(content)
  }
}

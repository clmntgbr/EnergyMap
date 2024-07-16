import env from '#start/env'
import { promises as fs } from 'node:fs'

export default class FilterService {
  async departments(departments: string[]) {
    if (departments.length === 0) {
      return ''
    }

    const json = await this.getDepartmentsJson()
    const result = []

    for (const department of departments) {
      const data = this.findUuidInData(json, department)
      if (data) {
        result.push(data.code)
      }
    }

    if (result.length > 0) {
      return ` AND SUBSTRING(addresses.postal_code, 1, 2) IN (${result.map((code) => `'${code}'`).join(', ')}) `
    }

    return ''
  }

  findUuidInData(data: any, uuidToFind: string) {
    for (const item of data) {
      if (item.uuid === uuidToFind) {
        return item
      }
    }
    return null
  }

  async getDepartmentsJson() {
    const departmentsJson = env.get('DEPARTMENTS_JSON', '')
    const gasPublicPath = env.get('GAS_PUBLIC_PATH', '')

    if (!departmentsJson || !gasPublicPath) {
      return
    }

    const content = await fs.readFile(`${gasPublicPath}/${departmentsJson}`, 'utf8')
    return JSON.parse(content)
  }

  async getServicesJson() {
    const servicesJson = env.get('SERVICES_JSON', '')
    const gasPublicPath = env.get('GAS_PUBLIC_PATH', '')

    if (!servicesJson || !gasPublicPath) {
      return
    }

    const content = await fs.readFile(`${gasPublicPath}/${servicesJson}`, 'utf8')
    return JSON.parse(content)
  }
}

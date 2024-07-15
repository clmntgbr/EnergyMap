import Type from '#models/type'
import env from '#start/env'
import db from '@adonisjs/lucid/services/db'
import { promises as fs } from 'node:fs'
import { v4 as uuidv4 } from 'uuid'

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

  async getRegions() {
    const result = await db.from('addresses').distinct('region').limit(100).select('region')
    const filteredResult = result.filter((row) => row.region !== null)

    return filteredResult.map((row) => ({
      uuid: uuidv4(),
      name: row.region.toLowerCase().replace(/^\w/, (c: string) => c.toUpperCase()),
    }))
  }
}

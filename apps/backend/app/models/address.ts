import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import { v4 as uuidv4 } from 'uuid'

export default class Address extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare uuid: string

  @column()
  declare stationId: string

  @column()
  declare vicinity: string

  @column()
  declare street: string

  @column()
  declare number: string | null

  @column()
  declare city: string

  @column()
  declare region: string

  @column()
  declare postalCode: string

  @column()
  declare country: string

  @column()
  declare longitude: string

  @column()
  declare latitude: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  constructor() {
    super()
    this.uuid = uuidv4()
  }
}

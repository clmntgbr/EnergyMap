import { BaseModel, column } from '@adonisjs/lucid/orm'
import { IAddress } from '@energy_map/models/IAddress.js'
import { DateTime } from 'luxon'
import { v4 as uuidv4 } from 'uuid'

export default class Address extends BaseModel implements IAddress {
  @column({ isPrimary: true, serializeAs: null })
  declare id: number

  @column()
  declare uuid: string

  @column()
  declare stationId: string

  @column()
  declare vicinity: string

  @column()
  declare street: string | null

  @column()
  declare number: string | null

  @column()
  declare city: string | null

  @column()
  declare region: string

  @column()
  declare postalCode: string | null

  @column()
  declare country: string

  @column()
  declare longitude: number

  @column()
  declare latitude: number

  @column.dateTime({ autoCreate: true, serializeAs: null })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  declare updatedAt: DateTime

  constructor() {
    super()
    this.uuid = uuidv4()
  }
}

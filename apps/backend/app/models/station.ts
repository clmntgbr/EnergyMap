import Address from '#models/address'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { StationStatus } from '@energy_map/enums/station_status.js'
import { DateTime } from 'luxon'
import { v4 as uuidv4 } from 'uuid'

export default class Station extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare uuid: string

  @column()
  declare stationId: string

  @column()
  declare type: string

  @column()
  declare pop: string

  @column()
  declare name: string | null

  @column()
  declare status: string

  @column()
  declare element: string

  @belongsTo(() => Address, { foreignKey: 'addressId' })
  declare address: BelongsTo<typeof Address>

  @column({ serializeAs: null })
  declare addressId: number

  @column.dateTime()
  declare closedAt: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  constructor() {
    super()
    this.uuid = uuidv4()
    this.status = StationStatus.CREATED
  }
}

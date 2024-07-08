import Address from '#models/address'
import Price from '#models/price'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import { StationStatus } from '@energy_map/enums/station_status.js'
import { IStation } from '@energy_map/models/IStation.js'
import { DateTime } from 'luxon'
import { v4 as uuidv4 } from 'uuid'

export default class Station extends BaseModel implements IStation {
  @column({ isPrimary: true, serializeAs: null })
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

  @column({ serializeAs: null })
  declare element: string

  @belongsTo(() => Address, { foreignKey: 'addressId' })
  declare address: BelongsTo<typeof Address>

  @column({ serializeAs: null })
  declare addressId: number

  @hasMany(() => Price, { foreignKey: 'stationId' })
  declare prices: HasMany<typeof Price>

  @column.dateTime()
  declare closedAt: DateTime | null

  @column.dateTime({ autoCreate: true, serializeAs: null })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  declare updatedAt: DateTime

  constructor() {
    super()
    this.uuid = uuidv4()
    this.status = StationStatus.CREATED
  }
}

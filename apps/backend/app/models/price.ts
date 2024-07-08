import Station from '#models/station'
import Type from '#models/type'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { IPrice } from '@energy_map/models/IPrice.js'
import { DateTime } from 'luxon'
import { v4 as uuidv4 } from 'uuid'

export default class Price extends BaseModel implements IPrice {
  @column({ isPrimary: true, serializeAs: null })
  declare id: number

  @column()
  declare uuid: string

  @column()
  declare stationRelated: string

  @column()
  declare value: string

  @column()
  declare datetimestamp: string

  @belongsTo(() => Type, { foreignKey: 'typeId' })
  declare type: BelongsTo<typeof Type>

  @column({ serializeAs: null })
  declare typeId: number

  @belongsTo(() => Station, { foreignKey: 'stationId' })
  declare station: BelongsTo<typeof Station>

  @column({ serializeAs: null })
  declare stationId: number | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  constructor() {
    super()
    this.uuid = uuidv4()
  }
}

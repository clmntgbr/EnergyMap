import Type from '#models/type'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import { v4 as uuidv4 } from 'uuid'

export default class Price extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare uuid: string

  @column()
  declare stationId: string

  @column()
  declare value: string

  @column()
  declare datetimestamp: string

  @belongsTo(() => Type, { foreignKey: 'typeId' })
  declare type: BelongsTo<typeof Type>

  @column({ serializeAs: null })
  declare typeId: number

  @column.dateTime()
  declare date: DateTime

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  constructor() {
    super()
    this.uuid = uuidv4()
  }
}

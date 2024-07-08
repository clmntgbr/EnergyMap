import { BaseModel, column } from '@adonisjs/lucid/orm'
import { IType } from '@energy_map/models/IType.js'
import { DateTime } from 'luxon'
import { v4 as uuidv4 } from 'uuid'

export default class Type extends BaseModel implements IType {
  @column({ isPrimary: true, serializeAs: null })
  declare id: number

  @column()
  declare uuid: string

  @column()
  declare name: string

  @column()
  declare reference: string

  @column.dateTime({ autoCreate: true, serializeAs: null })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  declare updatedAt: DateTime

  constructor() {
    super()
    this.uuid = uuidv4()
  }
}

import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'addresses'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.uuid('uuid')

      table.string('number').nullable()

      table.string('station_id').notNullable()
      table.string('vicinity').notNullable()
      table.string('street').notNullable()
      table.float('longitude').notNullable()
      table.float('latitude').notNullable()
      table.string('postal_code').notNullable()

      table.string('region').nullable()
      table.string('city').nullable()
      table.string('country').nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

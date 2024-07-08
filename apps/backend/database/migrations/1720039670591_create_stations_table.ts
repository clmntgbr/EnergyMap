import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'stations'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.uuid('uuid')

      table.string('name').nullable()
      table.timestamp('closed_at').nullable()

      table.string('station_id').notNullable()
      table.string('type').notNullable()
      table.string('pop').notNullable()
      table.string('status').notNullable()
      table.text('element').notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')

      table
        .integer('address_id')
        .unsigned()
        .references('id')
        .inTable('addresses')
        .onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

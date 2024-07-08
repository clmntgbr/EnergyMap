import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'prices'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.uuid('uuid')

      table.string('station_id').notNullable()
      table.string('value').notNullable()
      table.string('datetimestamp').notNullable()
      table.timestamp('date').notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')

      table.integer('type_id').unsigned().references('id').inTable('types').onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

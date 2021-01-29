
exports.up = async function(knex) {
  await knex.schema.createTable('users', table => {
    table.increments('id').unsigned().primary()
    table.string('username').unique().notNullable()
    table.string('password').notNullable()
  })

  await knex.schema.createTable('products', table => {
    table.increments('id').unsigned().primary()
    table.string('name').notNullable()
    table.integer('user_id').unsigned().notNullable()
    table.foreign('user_id').references('users.id').onDelete('CASCADE').onUpdate('CASCADE')
  })

  await knex.schema.createTable('lists', table => {
    table.increments('id').unsigned().primary()
    table.string('name').notNullable()
    table.integer('user_id').unsigned().notNullable()
    table.foreign('user_id').references('users.id').onDelete('CASCADE').onUpdate('CASCADE')
  })

  await knex.schema.createTable('lists_to_products', table => {
    table.integer('list_id').unsigned()
    table.foreign('list_id').references('lists.id').onDelete('CASCADE').onUpdate('CASCADE')
    table.integer('product_id').unsigned()
    table.foreign('product_id').references('products.id').onDelete('CASCADE').onUpdate('CASCADE')
    table.primary(['list_id', 'product_id'])
  })
};

exports.down = async function(knex) {
  await knex.schema.dropTable('lists_to_products')
  await knex.schema.dropTable('lists')
  await knex.schema.dropTable('products')
  await knex.schema.dropTable('users')
};

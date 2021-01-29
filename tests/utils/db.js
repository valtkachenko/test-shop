const Knex = require('knex')
const configs = require('../../knexfile')

async function create() {
  const config = configs[process.env.NODE_ENV || 'test']

  let knex = Knex({...config, connection: {...config.connection, database: null}})
  await knex.raw(`DROP DATABASE IF EXISTS ${config.connection.database}`)
  await knex.raw(`CREATE DATABASE ${config.connection.database}`)
  await knex.destroy()

  knex = Knex(config)
  await knex.migrate.latest()
  await knex.destroy()
}

async function drop() {
  const config = configs[process.env.NODE_ENV || 'test']

  const knex = Knex({...config, connection: {...config.connection, database: null}})
  await knex.raw(`DROP DATABASE IF EXISTS ${config.connection.database}`)
  await knex.destroy()
}

async function clear() {
  const config = configs[process.env.NODE_ENV || 'test']

  const knex = Knex(config)
  await knex.migrate.rollback()
  await knex.migrate.latest()
  await knex.destroy()
}

module.exports = {create, drop, clear}
const { Model, knexSnakeCaseMappers } = require('objection')
const Knex = require('knex')
const configs = require('../knexfile')
const User = require('./models/User')
const List = require('./models/List')
const Product = require('./models/Product')

const knex = Knex({
  debug: true,
  ...configs[process.env.NODE_ENV || 'dev'],
  ...knexSnakeCaseMappers()
})

Model.knex(knex)

module.exports = { knex, User, List, Product }
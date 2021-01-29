require('dotenv/config')
const {create, drop} = require('./utils/db')

exports.mochaHooks = {
  async beforeAll() {
    await create()
  },
  async afterAll() {
    await require('../db').knex.destroy()
    await drop()
  }
};
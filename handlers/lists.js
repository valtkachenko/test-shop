const HttpError = require('http-errors')
const db = require('../db')
const Product = require('../db/models/Product')
const schemas = require('../schemas/list')

async function getLists() {
  return await db.List.query().withGraphJoined('products')
}

async function createList({ auth, data }) {
  if (!auth) throw new HttpError(401, 'The operation is not allowed')
  const list = await schemas.schema.validateAsync(data)
  list.userId = auth.userId
  list.products = list.products.map(product => ({...product, userId: auth.userId}))
  return await db.List.query().insertGraph(list).returning('*')
}

async function updateList({ auth, id, data }) {
  if (!auth) throw new HttpError(401, 'The operation is not allowed')
  const listId = await schemas.id.validateAsync(id)
  const list = await schemas.schema.validateAsync(data)
  const [updated] = await db.List.query().patch(list).where('id', listId).where('userId', auth.userId).returning('*')
  if (!updated) throw new HttpError(404, 'List does not exist')
  const products = await updated.$relatedQuery('products')
    .insert(list.products.map(product => ({...product, userId: auth.userId})))
    .returning('*')
  await updated.$relatedQuery('products').unrelate().whereNotIn('id', products.map(product => product.id))
  updated.$setRelated('products', products)
  return updated
}

async function deleteList({ auth, id }) {
  if (!auth) throw new HttpError(401, 'The operation is not allowed')
  const listId = await schemas.id.validateAsync(id)
  const deleted = await db.List.query().del().where('id', listId).where('userId', auth.userId)
  if (!deleted) throw new HttpError(404, 'List does not exist')
}

module.exports = {
  getLists, 
  createList, 
  updateList,
  deleteList
}
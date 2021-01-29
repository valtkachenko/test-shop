const HttpError = require('http-errors')
const db = require('../db')
const schemas = require('../schemas/product')

async function getProducts() {
  return await db.Product
    .query()
    .select('*')
}

async function createProduct({ auth, data }) {
  if (!auth) throw new HttpError(401, 'The operation is not allowed')
  const product = await schemas.schema.validateAsync(data)
  product.userId = auth.userId
  return await db.Product.query().insert(product).returning('*')
}

async function updateProduct({ auth, id, data }) {
  if (!auth) throw new HttpError(401, 'The operation is not allowed')
  const productId = await schemas.id.validateAsync(id)
  const product = await schemas.schema.validateAsync(data)
  const [updated] = await db.Product.query().patch(product).where('id', productId).where('userId', auth.userId).returning('*')
  if (!updated) throw new HttpError(404, 'Product does not exist')
  return updated
}

async function deleteProduct({ auth, id }) {
  if (!auth) throw new HttpError(401, 'The operation is not allowed')
  const productId = await schemas.id.validateAsync(id)
  const deleted = await db.Product.query().del().where('id', productId).where('userId', auth.userId)
  if (!deleted) throw new HttpError(404, 'Product does not exist')
}

module.exports = {
  getProducts, 
  createProduct, 
  updateProduct,
  deleteProduct
}
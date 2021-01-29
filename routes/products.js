const Router = require('koa-router')
const auth = require('../middlewares/auth')
const { getProducts, createProduct, updateProduct, deleteProduct } = require('../handlers/products')

const router = new Router({prefix: '/products'})

router.get('/', async ctx => {
  ctx.response.body = await getProducts()
})

router.post('/', auth, async ctx => {
  ctx.response.body = await createProduct({ auth: ctx.state.auth, data: ctx.request.body })
})

router.patch('/:productId', auth, async ctx => {
  ctx.response.body = await updateProduct({ 
    auth: ctx.state.auth, 
    id: ctx.request.params.productId, 
    data: ctx.request.body 
  })
})

router.delete('/:productId', auth, async ctx => {
  ctx.response.body = await deleteProduct({ auth: ctx.state.auth, id: ctx.request.params.productId })
})

module.exports = router
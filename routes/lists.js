const Router = require('koa-router')
const auth = require('../middlewares/auth')
const { getLists, createList, updateList, deleteList } = require('../handlers/lists')

const router = new Router({prefix: '/lists'})

router.get('/', async ctx => {
  ctx.response.body = await getLists()
})

router.post('/', auth, async ctx => {
  ctx.response.body = await createList({ auth: ctx.state.auth, data: ctx.request.body })
})

router.patch('/:listId', auth, async ctx => {
  ctx.response.body = await updateList({
    auth: ctx.state.auth, 
    id: ctx.request.params.listId, 
    data: ctx.request.body
  })
})

router.delete('/:listId', auth, async ctx => {
  ctx.response.body = await deleteList({ auth: ctx.state.auth, id: ctx.request.params.listId })
})

module.exports = router
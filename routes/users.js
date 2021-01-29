const Router = require('koa-router')
const db = require('../db')
const { getUsers, createUser, signIn } = require('../handlers/users')

const router = new Router({prefix: '/users'})

router.get('/', async ctx => {
  ctx.response.body = await getUsers()
})

router.post('/', async ctx => {
  ctx.response.body = await createUser({
    username: 'Sam',
    password: '123123'
  })
})

router.post('/signin', async ctx => {
  ctx.response.body = await signIn(ctx.request.body)
})

module.exports = router
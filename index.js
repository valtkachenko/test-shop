require('dotenv/config')
const Koa = require('koa')
const body = require('koa-body')
const lists = require('./routes/lists')
const products = require('./routes/products')
const users = require('./routes/users')

const app = new Koa()

app.use(body())

app.use(async (ctx, next) => {
	try {
		await next()
	} catch (err) {
		if (err.isJoi) {
			ctx.status = 400
			ctx.body = err.details
		} else {
			ctx.status = err.status || 500
			ctx.body = { message: err.message }
		}
	}
})

app.use(lists.routes())
app.use(products.routes())
app.use(users.routes())

if (require.main === module) app.listen(3000)

module.exports = app
const jwt = require('jsonwebtoken')
const HttpError = require('http-errors')
const db = require('../db')
const schemas = require('../schemas/user')

async function getUsers() {
	return await db.User.query().select('*')
}

async function createUser(user) {
	const newUser = await schemas.schema.validateAsync(user)
	return await db.User.query().insert(newUser).returning('*')
}

async function signIn(credentials) {
	credentials = await schemas.schema.validateAsync(credentials)
	const user = await db.User.query().where('username', credentials.username).first()
	if (!user) throw new HttpError(404, 'No such user')
	if (!user.verifyPassword(credentials.password)) throw new HttpError(401,'Invalid password')
	const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET)
	user.token = token
	return user
}

module.exports = {
	getUsers,
	createUser,
	signIn
}
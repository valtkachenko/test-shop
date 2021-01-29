const Joi = require('joi')

exports.id = Joi.number().integer()

exports.schema = Joi.object({ 
  username: Joi.string().pattern(/^[a-zA-Z0-9_\-.]+$/),
  password: Joi.string().min(3).max(16)
})
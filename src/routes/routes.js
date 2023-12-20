const register = require('../api/register')
const Joi = require('@hapi/joi')
const login = require('../api/login')
const getDetailIngredient = require('../api/getDetailIngredient')
const addIngredient = require('../api/addIngredient')
const fetchIngredient = require('../api/fetchIngredient')

const routes = [
  {
    method: 'POST',
    path: '/users/register',
    handler: register,
    options: {
      validate: {
        payload: Joi.object({
          name: Joi.string().required(),
          email: Joi.string().email().required(),
          password: Joi.string().required()
        })
      }
    }
  },
  {
    method: 'POST',
    path: '/users/login',
    handler: login,
    options: {
      validate: {
        payload: Joi.object({
          email: Joi.string().email().required(),
          password: Joi.string().required()
        })
      }
    }
  },
  {
    method: 'GET',
    path: '/ingredient/{documentId}',
    handler: getDetailIngredient
  },
  {
    method: 'POST',
    path: '/ingredient/upload',
    handler: addIngredient,
    options: {
      payload: {
        allow: 'multipart/form-data',
        multipart: true,
        output: 'stream',
        maxBytes: 10000000
        // parse: true
      }
    }
  },
  {
    method: 'GET',
    path: '/ingredient',
    handler: fetchIngredient
  }
]

module.exports = routes

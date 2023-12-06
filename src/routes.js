const { register } = require('./handler')
const addIngredients = require('./API/addIngredients')

const routes = [
  {
    method: 'POST',
    path: '/users',
    handler: register
  },
  {
    method: 'POST',
    path: '/ingredients',
    handler: addIngredients,
    config: {
      payload: {
        output: 'stream',
        parse: true,
        allow: 'multipart/form-data',
        maxBytes: 10485760
      }
    }
  }
]

module.exports = routes

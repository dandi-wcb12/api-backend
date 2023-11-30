const register = require('./handler')

const routes = [
  {
    method: 'POST',
    path: '/users',
    handler: register
  }
]

module.exports = routes

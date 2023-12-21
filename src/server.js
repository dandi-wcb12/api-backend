require('dotenv').config()
const Hapi = require('@hapi/hapi')
const inert = require('@hapi/inert')
const path = require('path')
const routes = require('./routes/routes')

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 8080,
    host: process.env.HOST === 'production' ? '0.0.0.0' : 'localhost',
    routes: {
      cors: {
        origin: ['*'],
        headers: ['Accept', 'Content-Type']
      },
      files: {
        relativeTo: path.join(__dirname, 'public')
      }
    }
  })

  await server.register(inert)

  server.route(routes)

  await server.start()
  console.log(`server running on ${server.info.uri}`)
}

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

init()

const bucket = require('../config/cloudstorage.config')
const fs = require('fs')

const addIngredient = async (request, h) => {
  const file = request.payload.file
  const stream = file.hapi.pipe(fs.createWriteStream('/tmp/uploaded-file'))
  await new Promise((resolve, reject) => {
    stream.on('finish', resolve)
    stream.on('error', reject)
  })

  const uploadStream = bucket.upload('/tmp/uploaded-file', {
    gzip: true,
    metadata: {
      cacheControl: 'public, max-age=31536000'
    }
  })

  uploadStream.on('error', (err) => {
    console.error(`Error uploading file: ${err}`)
  })

  uploadStream.on('finish', () => {
    console.log(`File uploaded to ${bucket.name}`)
  })

  return h.response('File received').code(200)
}

module.exports = addIngredient

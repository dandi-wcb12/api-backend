const { Storage } = require('@google-cloud/storage')
const storage = new Storage()
const bucketName = 'capstone-bucket31'
const bucket = storage.bucket(bucketName)
// const multer = require('multer')
// const upload = multer({ dest: 'uploads/' })

const uploadImage = async (request, h) => {
  const file = request.payload.file
  const filePath = `images/${file.filename}`
  const blob = bucket.file(filePath)
  const blobStream = blob.createWriteStream()

  await new Promise((resolve, reject) => {
    blobStream.on('error', (err) => {
      console.error('Upload failed:', err)
      reject(h.response({ success: false, message: 'Upload failed: ' + err.message }).code(500))
    })

    blobStream.on('finish', () => {
      console.log('Upload successful:', filePath)
      resolve(h.response({ success: true, message: 'Upload successful: ' + filePath }))
    })

    blobStream.end(file.buffer)
  })
}

module.exports = uploadImage

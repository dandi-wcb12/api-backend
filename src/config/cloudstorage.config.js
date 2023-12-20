const { Storage } = require('@google-cloud/storage')

const storage = new Storage()
const bucketName = 'capstone-bucket31'
const bucket = storage.bucket(bucketName)

module.exports = bucket

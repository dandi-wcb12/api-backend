const Firestore = require('@google-cloud/firestore')
const firestore = new Firestore({
  projectId: process.env.PROJECT_ID,
  keyFilename: process.env.SERVICE_ACCOUNT_KEY
})

module.exports = firestore

const firestore = require('../config/cloudfirestore.config')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const login = async (request, h) => {
  const { email, password } = request.payload
  const userRef = firestore.collection('users').where('email', '==', email)
  const snapshot = await userRef.get()

  if (!snapshot.empty) {
    const user = snapshot.docs[0].data()
    const ispasswordCorrect = await bcrypt.compare(password, user.password)
    if (ispasswordCorrect) {
      const token = jwt.sign({ id: user.id, name: user.name, email: user.email }, 'YOUR_SECRET_KEY')
      return h.response({
        status: 'success',
        id: user.id,
        name: user.name,
        token
      }).code(201)
    }
  }

  return h.response({
    status: 'login failed',
    message: 'Invalid email or password'
  }).code(400)
}

module.exports = login

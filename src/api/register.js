const firestore = require('../config/cloudfirestore.config')
const bcrypt = require('bcrypt')

const register = async (request, h) => {
  try {
    const { name, email, password } = request.payload
    const userDoc = await firestore.collection('users').where('email', '==', email).get()
    if (!userDoc.empty) {
      return h.response({ message: 'User already exists' }).code(400)
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = { name, email, password: hashedPassword }
    await firestore.collection('users').add(user)

    return h.response({
      status: 'success',
      message: 'user successfully added'
    }).code(201)
  } catch (error) {
    return h.response({
      status: 'fail',
      message: 'user failed to add'
    }).code(500)
  }
}

module.exports = register

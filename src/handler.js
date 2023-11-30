const Firebase = require('@google-cloud/firestore')
const db = new Firebase()

const register = async (request, h) => {
  try {
    const { name, email, password } = request.payload
    const user = { name, email, password }
    await db.collection('users').add(user)

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

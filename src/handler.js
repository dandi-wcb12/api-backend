const Firebase = require('@google-cloud/firestore')
const { Storage } = require('@google-cloud/storage')
const db = new Firebase()
const storage = new Storage()
const bucket = storage.bucket('capstone-bucket31')

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

const addNewIngredient = async (request, h) => {
  try {
    // const { location, ingName, quantity, desc, lat, lon } = request.payload
    // const createdAt = new Date().toISOString()
    const file = request.payload.file
    const fileName = `${file.hapi.filename}`
    await bucket.upload(file.path, { destination: fileName })
    // const photoUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`
    // const ingredient = {
    //   photoUrl,
    //   location,
    //   ingName,
    //   quantity,
    //   desc,
    //   lat,
    //   lon,
    //   createdAt
    // }
    // await db.collection('ingredient').add(ingredient)
    return h.response({
      status: 'success',
      message: 'ingredient successfully added'
    }).code(201)
  } catch (error) {
    return h.response({
      status: 'fail',
      message: 'ingredient failed to add'
    }).code(500)
  }
}

module.exports = { register, addNewIngredient }

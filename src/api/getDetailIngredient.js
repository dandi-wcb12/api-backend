const firestore = require('../config/cloudfirestore.config')

const getDetailIngredient = async (request, h) => {
  const { documentId } = request.params
  const doc = await firestore.collection('ingredient').doc(documentId).get()
  if (!doc.exists) {
    return h.response({
      status: 'fail',
      message: 'Data not found'
    }).code(404)
  }
  const data = doc.data()
  return h.response({
    status: 'success',
    ingredient: {
      data
    }
  })
}

module.exports = getDetailIngredient

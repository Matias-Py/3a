const mongoose = require('mongoose')

const url =`mongodb+srv://matiaspy:olimpia10@cluster0.fmg0j0i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
mongoose.connect(url)

const contactoSchema = new mongoose.Schema({
  name: String,
  number: Number,
})

contactoSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Contacto', contactoSchema)
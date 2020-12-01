const mongoose = require('mongoose')
const { Schema } = mongoose

const orcamento = new Schema({
   name: {
      type: String
   },
   email: {
      type: String
   },
   phone: {
      type: String
   },
   whatsapp: {
      type: String
   },
   msg: {
      type: String
   }
   
}, {
   timestamps: true
})

mongoose.model('Orcamento', orcamento)
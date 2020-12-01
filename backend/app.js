const express = require('express')
const mongoose = require('mongoose')


require('./model/orcamento')
const Orcamento = mongoose.model('Orcamento')

const app = express()
app.use(express.json())

mongoose.connect('mongodb+srv://rrarangel:subzero@cluster0-pzqsd.gcp.mongodb.net/celke?authSource=admin&replicaSet=Cluster0-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass%20Community&retryWrites=true&ssl=true', { 
   useNewUrlParser: true,
   useUnifiedTopology: true
})
   .then(() => {console.log('Database is connected...')})
   .catch(err => console.log('Database is not connected, error: ' + err))


app.get('/', (req, res) => {
   res.send('Minha Home')

})

app.post('/orcamento', async (req, res) => {
   
   await Orcamento.create(req.body, (err) => {
      if(err){
         return res.status(400).json({
            error: true,
            message: 'Erro ao enviar os dados: ' + err
         })
      }

      return res.json({
         error: false,
         message: 'Enviado com sucesso!'
      })
   })

})

app.listen(8000, () => {
   console.log('Server is running...')
})
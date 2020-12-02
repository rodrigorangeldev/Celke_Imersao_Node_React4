const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const nodemailer = require('nodemailer')


require('./model/orcamento')
const Orcamento = mongoose.model('Orcamento')

const app = express()

app.use((req, res, next) => {
   res.header("Access-Control-Allow-Origin", "*")
   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
   res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization")
   app.use(cors())
   next()
})


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

      var transport = nodemailer.createTransport({
         host: 'smtp.mailtrap.io',
         port: 587,
         auth: {
            user: '05bb5553d09d2d',
            pass: '227f9bbccd33f3'
         }
      })

      var sendInfo = {
            from: '56674090b6-94d7f2@inbox.mailtrap.io', // sender address
            to: req.body.email, // list of receivers
            subject: "Solicitação de orçamento recebida. ✔", // Subject line
            text: "Prezado(a)\n\n Recebi sua solicitação de orçamento em breve entrarei em contato.", // plain text body
            html: "<b>Prezado(a)</b><br /><br /> Recebi sua solicitação de orçamento em breve entrarei em contato.", // html body
          
      }

      transport.sendMail(sendInfo, function(err){
         if(err){
            console.log('Erro ao enviar o email: ' +err)
         }
         console.log('Email enviado')
      });

      console.log('Cadastrado com sucesso.')
      return res.json({
         error: false,
         message: 'Enviado com sucesso!'
      })
      
   })

})

app.listen(8000, () => {
   console.log('Server is running...')
})
const express = require('express')
const helmet = require('helmet')
const path = require('path')
const bodyParser = require('body-parser')

const adminRouter = require('./routers/adminRouter').router
const authRouter = require('./routers/authRouter').router

const app = express()
app.use(helmet())
app.use(bodyParser.json())

app.use('/admin/', adminRouter)
app.use('/auth/', authRouter)
app.get('/', (req,res)=>{
  res.sendFile('index.html', { root: path.join(__dirname, 'views') });
})

app.listen(8080, () => console.log('Serveur lancé sur le port 8080'))
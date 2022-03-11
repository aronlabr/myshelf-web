//Importamos librerias
const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const app = express()

const mongoose = require('mongoose')
const indexRouter = require('./routes')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

app.set('view engine', 'ejs')           // Motor de plantillas
app.set('views', __dirname + '/views')  // Directorio de las vistas
app.set('layout', 'layouts/layout')     // Directorio de plantillas (Header y Footer)

app.use(expressLayouts)                 // LLamar a la dependencia de manejo de plantillas con ejs
app.use(express.static('public'))       // Directorio de los archivos estaticos css,js,img

// Conectando a la Base de Datos
mongoose.connect(process.env.DATABASE_URL, {
    // useNewUrlParser: true
})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

// Importando rutas de index
app.use('/', indexRouter)

//Montando el servidor en la ruta 3000
app.listen(port = process.env.PORT || 3000, () => {
    console.log(`🤖 SERVER RUNNING IN http://localhost:${port}`)
})
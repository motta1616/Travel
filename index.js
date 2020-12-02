// CREANDO SERVIDOR LOCAL 

//1. EXPRESS

require('dotenv').config() // dotenv = se encarga de leer el archivo.env para sacar laas variables para replazarlas por los process.env

const express = require('express') // Importamos express
const mongoose = require('mongoose') // Importamos el drive de mongoose 
const viewsRouters = require('./routers/views') // importa los views de las paginas 
const apiRouters = require('./routers/api') // importa las api 

const app = express() //Llamamos express como una función 

app.use(express.static('public')) // Permite enrutar la carpeta de archivos statico (css,js,imagenes) 
app.use(express.json()) // Recibira la respuesta del potman del body en json y lo parsea (funcional)
app.set('view engine', 'ejs')// Habilitamos el view engine, por lo que siempre buscara la carpeta de views

app.use('/api', apiRouters) // permite agregarle el "/api" a las rutas de api y apiRouters 
app.use(viewsRouters)

mongoose.connect(process.env.MONGODB_URI, { // process.env = Permite acceder a una variable de entorno para conectarse con la base de datos de mongo 
    useNewUrlParser:true, // Permite eliminar los warning 
    useCreateIndex:true, // Permite eliminar los warning
    useUnifiedTopology:true // Permite eliminar los warning
})
.then(() => {
    console.log('database connected')
})
.catch((error) => {
    console.log('database connection failed')
    console.log(error)
})

app.listen(process.env.PORT, () => {
    console.log(`conectado con el puerto ${process.env.PORT}`)
}) // listen = permite que el servidor escuche las peticione y las responda, Habilitndo un puerto (3000) ya que los puertos nos diferencia los tipos de servicios, este puerto sera por el que repondera mi puerto 


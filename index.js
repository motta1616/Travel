// CREANDO SERVIDOR LOCAL 

//1. EXPRESS

require('dotenv').config()

const express = require('express') // Importamos express
const mongoose = require('mongoose') // Importamos el drive de mongoose 
const viewsRouters = require('./routers/views') // importa los views de las paginas 
const apiRouters = require('./routers/api') // importa las api 

const app = express() //Llamamos express como una función 

app.use(express.static('public')) // Permite enrutar la carpeta de archivos statico (css,js,imagenes) 
app.use(express.json()) // Recibira el request del body en json y lo parsea (funcional)
app.set('view engine', 'ejs')// Habilitamos el view engine, por lo que siempre buscara la carpeta de views

app.use(viewsRouters)
app.use('/api', apiRouters) // permite agregarle el "/api" a las rutas de api



mongoose.connect(process.env.MONGODB_URI, { // Permite conectarse con la base de datos de mongo 
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
    console.log('conectado con el puerto 3000')
}) // listen = permite que el servidor escuche las peticione y las responda, Habilitndo un puerto (3000) ya que los puertos nos diferencia los tipos de servicios, este puerto sera por el que repondera mi puerto 


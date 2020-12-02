const momgoose = require('mongoose')// importamos el mongoose
const hotelSchema = new momgoose.Schema({ // Permite crear la estructura que tendra nuestros documentos 
    nombre: {
        type: String,
        required: true, // el nombre es requerido de lo contrario emitira error
        trim: true // Es un validador que permite eliminar el espacio antes y despues del dato 
    },
    estrellas: {
        type: Number,
        max: 5 // Es un valiador que no permite tener numeros mayores a 5 
    },
    ciudad: {
        type: String
    }
})

module.exports = hotelSchema // Expotamos nuestra función 
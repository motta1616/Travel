const mongoose = require('mongoose') // Importamos el mongoose 
const hotelSchema = require('../schemas/hotel')// Importamos el esquema 

const hotelModel = new mongoose.model('Hotel', hotelSchema) // model = permite crear la colección con el nombre del primer parametro y con el esquema del segundo parametro  

module.exports = hotelModel
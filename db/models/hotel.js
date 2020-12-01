const mongoose = require('mongoose')
const hotelSchema = require('../schemas/hotel')

const hotelModel = new mongoose.model('Hotel', hotelSchema)

module.exports = hotelModel
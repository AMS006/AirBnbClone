const mongoose = require('mongoose')

const placeSchema = new mongoose.Schema({
    title:String,
    address:String,
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    price:Number,
    description:String,
    images:[String],
    perks:[String],
    checkIn:String,
    checkOut:String,
    maxGuests:Number,
    status:{
        type:String,
        default:"Not Booked"
    },
})

module.exports = mongoose.model('places',placeSchema)
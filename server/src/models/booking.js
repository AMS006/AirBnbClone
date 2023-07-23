const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    place:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"places",
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true
    },
    name:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    checkIn:{
        type:String,
        required:true
    },
    checkOut:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    }
},
{timestamps:true})

module.exports = mongoose.model('bookings',bookingSchema)
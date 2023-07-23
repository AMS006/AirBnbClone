const bookingModel = require('../models/booking');
const placeModel = require("../models/places")
const schedule = require('node-schedule');

exports.addBooking = async(req,res) =>{
    try {
        const {checkIn,checkOut,name,phone,price,place} = req.body
        
        const _id = req.user._id
        const data = {checkIn,checkOut,name,phone,price,place,user:_id}

        const booking = await bookingModel.create(data)

        if(booking){
            await placeModel.findByIdAndUpdate(place,{status:"Booked"})
            const date = new Date(checkOut);
            schedule.scheduleJob(date,async()=>{
                await placeModel.findByIdAndUpdate(place,{status:"Not Booked"})
            })
        }

        let updatedBooking = await booking.populate('place')

        return res.status(200).json({booking:updatedBooking});
    } catch (error) {
        return res.status(500).json({message:error.massage})
    }
}
exports.getUserBookings = async(req,res) =>{
    try {
        const _id = req.user._id
        const bookings = await bookingModel.find({user:_id}).populate('place').sort({createdAt:-1})
        if(bookings.length <= 0)
           return res.status(404).json({message:"No Booking Found"})
        return res.status(200).json({bookings});
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}
const bookingModel = require('../models/booking');
const jwt = require('jsonwebtoken')

exports.addBooking = async(req,res) =>{
    try {
        const {checkIn,checkOut,name,phone,price,place} = req.body
        const {userToken} = req.cookies
        if(!userToken)
            return res.json(null)
        const {_id} = await jwt.verify(userToken,process.env.SECRET_KEY);
        const data = {checkIn,checkOut,name,phone,price,place,user:_id}
        console.log(data);
        const booking = await bookingModel.create(data)
        console.log(booking)
        return res.status(200).json({booking});
    } catch (error) {
        return res.status(500).json({message:error.massage})
    }
}
exports.getUserBookings = async(req,res) =>{
    try {
        const {userToken} = req.cookies
        if(!userToken)
            return res.json(null)
        const {_id} = await jwt.verify(userToken,process.env.SECRET_KEY);
        const bookings = await bookingModel.find({user:_id}).populate('place')
        if(bookings.length <= 0)
           return res.status(404).json({message:"No Booking Found"})
        return res.status(200).json({bookings});
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}
const express = require('express')
const { addBooking, getUserBookings } = require('../controllers/booking')

const router = express.Router()

router.post('/',addBooking)

router.get('/',getUserBookings);

module.exports = router
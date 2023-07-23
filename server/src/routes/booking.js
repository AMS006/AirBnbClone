const express = require('express')
const { addBooking, getUserBookings } = require('../controllers/booking')
const isAuthorized = require('../middleware/authorization')

const router = express.Router()

router.post('/',isAuthorized,addBooking)

router.get('/',isAuthorized,getUserBookings)

module.exports = router
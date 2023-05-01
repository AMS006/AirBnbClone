const express = require('express')
const {createUser,loginUser, getProfile, logout} = require('../controllers/user')

const router = express.Router();

router.post('/createUser',createUser);

router.post('/login',loginUser)

router.post('/logout',logout)

router.get('/profile',getProfile)
module.exports = router;
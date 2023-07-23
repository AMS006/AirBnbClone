const express = require('express')
const {createUser,loginUser, getProfile} = require('../controllers/user');
const isAuthorized = require('../middleware/authorization');

const router = express.Router();

router.post('/createUser',createUser);

router.post('/login',loginUser)

router.get('/profile',isAuthorized,getProfile)

module.exports = router;
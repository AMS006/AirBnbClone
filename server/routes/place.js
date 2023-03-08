const express = require('express')
const multer = require('multer');
const { addImagesViaLink, uploadImage, addNewPlaces, getUserPlaces, getPlaceById, updatePlace, getAllPlaces } = require('../controllers/places')

const router = express.Router()
const upload = multer({dest:'uploads/'})

router.post('/addImage',addImagesViaLink)

router.post('/upload',upload.array('files',20),uploadImage)

router.post('/addPlace',addNewPlaces)

router.get('/userPlaces',getUserPlaces);

router.get('/getPlace/:id',getPlaceById);

router.get('/',getAllPlaces);

router.put('/:id',updatePlace)

module.exports = router;
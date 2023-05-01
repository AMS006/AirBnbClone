const placeModel = require('../models/places')
const download = require('image-downloader');
const fse = require('fs-extra')
const jwt = require('jsonwebtoken')
exports.addNewPlaces = async(req,res) =>{
    const {userToken} = req.cookies
    if(!userToken){
        return res.status(400).json({message:"Invalid Request"})
    }
    const userData = await jwt.verify(userToken,process.env.SECRET_KEY);
    // const user = await userModel.findById(userData._id);
    const {title,address,images,price,perks,checkIn,checkOut,maxGuests,description} = req.body
    const data = {
        owner:userData._id,
        title,address,images,price,perks,checkIn,checkOut,maxGuests,description
    }
    const place = await placeModel.create(data);

    res.status(201).json({place});
}
exports.getUserPlaces = async(req,res) =>{
    try {
        const {userToken} = req.cookies
        if(!userToken){
            return res.status(400).json({message:"Invalid Request"})
        }
        const userData = await jwt.verify(userToken,process.env.SECRET_KEY);
        const {_id} = userData;
        const places = await placeModel.find({owner:_id});
        if(!places)
            res.json({message:"No places Found"})
        return res.status(200).json({places})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}
exports.getAllPlaces = async(req,res) =>{
    try {
        const places = await placeModel.find();

        if(!places)
            return res.status(404).json({message:"No restaurant found"})
        
        return res.status(200).json({places});
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}
exports.getPlaceById = async(req,res) =>{
    try {
        const {id} = req.params
        const {title,address,images,price,perks,checkIn,checkOut,maxGuests,description} = req.body
        if(!id)
            return res.status(400).json({message:"Bad Request"})

        const place = await placeModel.findById(id);

        return res.status(200).json({place});
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}
exports.updatePlace = async(req,res) =>{
    try {
        const {userToken} = req.cookies
        const {id} = req.params
        const {title,address,images,price,perks,checkIn,checkOut,maxGuests,description} = req.body
        if(!userToken){
            return res.status(400).json({message:"Invalid Request"})
        }
        const {_id} = await jwt.verify(userToken,process.env.SECRET_KEY);
        const place = await placeModel.findById(id)
        if(!place)
            return res.status(400).json({message:"Invalid request"})
        if(_id === place.owner.toString()){
            place.set({
                title,address,images,price,perks,checkIn,checkOut,maxGuests,description
            })
            await place.save()
            return res.status(200).json({place})
        }
            return res.status(400).json({message:"Unable to update Place"})
        } catch (error) {
        return res.status(500).json({message:error.message})
    }
}
exports.addImagesViaLink = async(req,res) =>{
    try {
        const {link} = req.body;
        const name = 'photo' + Date.now() + '.jpg'
        let destination = __dirname
        destination = destination.replace('controllers','');
        const options = {
            url: link,
            dest: destination + 'uploads/' + name
        }
        await download.image(options)
        res.json({name})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}
exports.uploadImage = async(req,res) =>{
    try {
        const uploadedImages = []
        for(let i = 0;i<req.files.length;i++){
            const {path,originalname} = req.files[i];
            const words = originalname.split('.');
            const extension = words[words.length -1]
            const newPath = path + '.' + extension
            fse.renameSync(path,newPath)
            uploadedImages.push(newPath.replace('uploads\\' ,''))
        }
        return res.json({images:uploadedImages})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}
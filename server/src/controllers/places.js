const placeModel = require('../models/places')
const uploads = require('../utils/uploads')

exports.addNewPlaces = async(req,res) =>{
    const _id = req.user._id
    const {title,address,images,price,perks,checkIn,checkOut,maxGuests,description} = req.body
    const data = {
        owner:_id,
        title,address,images,price,perks,checkIn,checkOut,maxGuests,description
    }
    const place = await placeModel.create(data);

    res.status(201).json({place});
}
exports.getUserPlaces = async(req,res) =>{
    try {
        const _id = req.user._id
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
            return res.status(404).json({message:"No Places found"})
        
        return res.status(200).json({places});
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}
exports.getPlaceById = async(req,res) =>{
    try {
        const {id} = req.params
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
        
        const {id} = req.params
        const {title,address,images,price,perks,checkIn,checkOut,maxGuests,description} = req.body
        const _id = req.user._id
        const place = await placeModel.findById(id)
        if(!place)
            return res.status(400).json({message:"Invalid request"})

        if(_id.toString() === place.owner.toString()){
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
exports.uploadImage = async(req,res) =>{
    try {
        const uploadedImages = []
        for(let i = 0;i<req.files.length;i++){
            const img = await uploads(req.files[i].buffer)
            uploadedImages.push(img.url)
        }
        return res.json({images:uploadedImages})
    } catch(error) {
        return res.status(500).json({message:error.message})
    }
}
exports.deletePlace = async(req,res) =>{
    try {
        const id = req.params.id;
        const data = await placeModel.findByIdAndDelete(id)
        return res.status(200).json({message:"Accomodation Deleted"})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}
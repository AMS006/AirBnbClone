const jwt = require('jsonwebtoken')
const userModel = require('../models/user')

const isAuthorized = async(req,res,next) =>{
    if(req.headers.authorization && 
        req.headers.authorization.startsWith("Bearer")){
            try {
                let token = req.headers.authorization.split(" ")[1]
                let userData = jwt.verify(token,process.env.JWT_SECRET)
            
                  req.user =   await userModel.findById(userData._id).select("-password")
                next()
            } catch (error) {
                return res.status(500).json({message:error.message})
            }
    }else{
        return res.status(400).json({message:"Plzz Login To Access"})
    }
}
module.exports = isAuthorized
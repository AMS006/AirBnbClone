const userModel = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const generateToken = (_id) =>{
    const token =  jwt.sign({_id},process.env.SECRET_KEY,{expiresIn:'3d'})

    return token;
}
exports.createUser = async(req,res) =>{
    try {
        const{name,email,password} = req.body;
        const isUserExists = await userModel.findOne({email})
        const bcryptSalt = await bcrypt.genSaltSync(10);
        if(isUserExists)
            return res.status(400).json({message:"User Already Exists"})
        const user = await userModel.create({name,
            email,
            password: bcrypt.hashSync(password,bcryptSalt)});
        if(user)
            return res.status(200).json({message:"User registration successfully"});
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}
exports.loginUser = async(req,res) =>{
    try {
        const {email,password} = req.body;

        const user = await userModel.findOne({email});

        if(!user)
            return res.status(400).json({message:"Invalid Credentials"})
        
        const isPasswordMatch = await bcrypt.compareSync(password,user.password);
        if(!isPasswordMatch)
            return res.status(400).json({message:"Invalid Credentials"})
        const token = generateToken(user._id);
        const options = {
            expires : new Date(
                Date.now() + 5 * 24 * 60 * 60 * 1000
            ),
            secure:false,
            httpOnly:true
        }
        return res.status(200).cookie('userToken',token,options).json({user});
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}
exports.logout = async(req,res) =>{
    try {

        return res.status(200).cookie('userToken',null,{
            expires: new Date(Date.now()),
        }).json({message:"Logout Successfull"})
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}
exports.getProfile = async(req,res) =>{
    try {
        const {userToken} = req.cookies
        if(!userToken)
            return res.json(null)
        const userData = await jwt.verify(userToken,process.env.SECRET_KEY);
        const user = await userModel.findById(userData._id);
        
        return res.status(200).json({user});
        
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}
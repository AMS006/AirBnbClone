const userModel = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const generateToken = (_id) =>{
    const token =  jwt.sign({_id},process.env.JWT_SECRET,{expiresIn:"30d"})

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
        const token = generateToken(user._id);
        if(user)
            return res.status(200).json({
                _id:user._id,
                name:user.name,
                email:user.email,
                token:token
            });
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}
exports.loginUser = async(req,res) =>{
    try {
        const {email,password} = req.body;

        const user = await userModel.findOne({email});

        if(!user)
            return res.status(400).json({message:"User Already Exists"})
        
        const isPasswordMatch = await bcrypt.compareSync(password,user.password);
        if(!isPasswordMatch)
            return res.status(400).json({message:"Invalid Credentials"})

        const token = generateToken(user._id);
        
        return res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            token:token
        });
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

exports.getProfile = async(req,res) =>{
    try {
        
        return res.status(200).json({user:req.user});
        
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const userShema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('users',userShema)
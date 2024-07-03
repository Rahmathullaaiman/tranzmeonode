//import mongoose
const mongoose = require('mongoose')

//create scheme
const userScheme = new mongoose.Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    email:{
        type:String,
        require:true,
        unique:true,
        validator(value){
            if(!validator.isEmail(value))
               { throw new Error('invalid Email')}
            
        }
    },
    password: {
        type: String
    },
    phonenumber: {
        type: String
    }
})

//create model
const users = mongoose.model("users",userScheme)

//export 
module.exports = users
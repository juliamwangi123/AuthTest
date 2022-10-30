const mongoose = require('mongoose');
const Schema = mongoose.Schema
const validator = require('validator');
const bcrypt = require ('bcrypt');


const userSchema = new Schema({
    email :{
        type:String,
        required:true,
        unique:true

    },
     password :{
        type:String,
        required: true

     }
})


//static  register method 

userSchema.statics.register = async function(email, password){
    //check if both fields are empty 
    if(!email || !password){
        throw Error('Fields should not be empty')
    }

    //check if email  is valid
     if(!validator.isEmail(email)){
        throw Error('Put valid email')
     };

     
     //check if password is strong 
     if(!validator.isStrongPassword(password)){
        throw Error("Password should be strog")
     }

     //check if email is in the database

     const checkUser = await this.findOne({email})

     if(checkUser){
        throw Error("Email already exist")
     }

     //hash password before saving it to the database
     const salt = await bcrypt.genSalt(10);
     const hash =await bcrypt.hash(password, salt)

     //save  user to the database
     const user = await this.create({email, password:hash})


     return user

}


//static method to login a user
userSchema.statics.loginUser = async function(email, password){
    //check if both fields are not empty
    if(!email || !password){
        throw Error('Field cannot be empty')
    }

    //check if user is already registerd

    const user = await this.findOne({email})

    //if the email does not exist throw an error 
    if(!user){
        throw Error('Email does not exist')
    }

    //else compare the password

    const comparePassword = await bcrypt.compare(password, user.password)

    //if the password  does not match 
    if(!comparePassword){
        throw Error('Incorrect Password')
    }

    return user
}




module.exports = mongoose.model('Users', userSchema)
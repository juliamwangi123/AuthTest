const User = require('../Modules/userModules')
const jwt = require('jsonwebtoken');


//generate jwt
const generateToken = (id)=>{
    jwt.sign({id}, process.env.SECRET, {expiresIn: '2d'})
    return jwt.sign({id}, process.env.SECRET, {expiresIn: '2d'})
}

const reg = async(req, res)=>{
    //get user details from the body 
    const {email, password} =req.body

    try {
        const user = await User.register(email, password)
        const token =generateToken(user._id)
        res.status(200).json(token)
        
    } catch (error) {
        res.status(400).json({error: error.message})
        
    }

}


//login user 
const login = async(req, res)=>{
    const{email ,password} =req.body
    try {
        const user = await User.loginUser(email, password)
        const token =generateToken(user._id)
        res.status(200).json(token)        
    } catch (error) {
        res.status(400).json({error :error.message})
        

        
    }
}

module.exports={
    reg, login
}
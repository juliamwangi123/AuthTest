
const {Router} =require('express')
const {reg, login} =require('../Controller/userController')

const route = Router()

//signup route
route.post('/reg', reg)

//login user
route.post('/login', login)


module.exports =route
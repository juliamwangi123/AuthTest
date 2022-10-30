//import modules 
require('dotenv').config();
 const express = require('express');
 const mongoose = require('mongoose');
 const userRoutes= require('./Routes/user');
 const cors = require('cors')


 //initialize express app 
 const app = express()


 //middleware
 app.use(cors())

 app.use(express.json()) //bodyparser


 //connect  app to the database
 mongoose.connect(process.env.DB_URI)
 .then(()=>{
    app.listen(process.env.PORT)
    console.log('connected')
 }).catch((error)=>{
    console.log(error)
 });



 //routes
 app.use('/user/', userRoutes)
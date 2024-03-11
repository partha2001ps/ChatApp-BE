const express = require('express')
const userController = require('../controllers/userController')
const userRoute = express.Router()

userRoute.post('/', userController.signup)
userRoute.post('/signin',userController.signIn)
module.exports=userRoute
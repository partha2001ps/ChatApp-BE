const express = require('express')
const userController = require('../controllers/userController')
const chatController = require('../controllers/chatController')
const userRoute = express.Router()

userRoute.post('/', userController.signup)
userRoute.post('/signin', userController.signIn)
userRoute.get('/:id', chatController.allUser)
userRoute.get('/chat/:senderId/:receiverId', chatController.fetchChat)
userRoute.post('/chat', chatController.sendChat)
userRoute.post('/reset-password', userController.resetPassword);
userRoute.post('/reset-password/:OTP',userController.newpassword);

module.exports=userRoute
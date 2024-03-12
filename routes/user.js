const express = require('express')
const userController = require('../controllers/userController')
const chatController = require('../controllers/chatController')
const userRoute = express.Router()

userRoute.post('/', userController.signup)
userRoute.post('/signin', userController.signIn)
userRoute.get('/', chatController.allUser)
userRoute.get('/chat/:senderId/:receiverId', chatController.fetchChat)
userRoute.post('/chat',chatController.sendChat)
module.exports=userRoute
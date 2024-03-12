const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { MONGOOSE_URL, PORT } = require('./utilies/config');
const userRoute = require('./routes/user');
const socket=require('socket.io')
const app = express()
app.use(cors())
app.use(express.json());
app.use('/',userRoute)
mongoose.connect(MONGOOSE_URL)
    .then(() => {
     console.log('connecting mongodb')
    })
    .catch((e) => {
     console.log('connection error',e)
    })
const server=app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
})
const io = socket(server)
io.on('connection', (socket) => {
    console.log('New client connected');
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
})
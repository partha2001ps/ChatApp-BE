const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { MONGOOSE_URL, PORT } = require('./utilies/config');
const userRoute = require('./routes/user');
const socketio = require('socket.io'); 
const http = require('http');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/', userRoute);

mongoose.connect(MONGOOSE_URL)
  .then(() => {
    console.log('Connecting to MongoDB');
  })
  .catch((e) => {
    console.log('Connection error', e);
  });

const server = http.createServer(app); 

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

const io = socketio(server, {
  cors: {
    origin: ["http://localhost:5173", "https://chatapplicationca.netlify.app"],
    methods: ["GET", "POST"],
  },
});

io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('join', (userId) => {
        socket.join(userId)
    })
    

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});


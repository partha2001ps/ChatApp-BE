const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { MONGOOSE_URL, PORT } = require('./utilies/config');
const userRoute = require('./routes/user');
const socketio = require('socket.io');
const http = require('http');
const ChatModel = require('./models/chat');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/', userRoute);

mongoose.connect(MONGOOSE_URL)
  .then(() => {
    console.log('Connected to MongoDB');
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
    socket.join(userId);
  });

  socket.on('message', async ({ senderId, receiverId, newMessage }) => {
    try {
      if (!senderId || !receiverId || !newMessage) {
        console.error('Sender ID, Receiver ID, and Message are required');
        return;
      }

      const chatMessage = new ChatModel({
        sender: senderId,
        receiver: receiverId,
        message: newMessage
      });

      await chatMessage.save();
      io.to(receiverId).emit('message', chatMessage);

    } catch (error) {
      console.error('Error sending message:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

module.exports = { io, server }; 

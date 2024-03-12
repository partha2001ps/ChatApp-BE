const io = require("..");
const ChatModel = require("../models/chat");
const User = require("../models/user");

const chatController = {
    allUser: async (req, res) => {
        try {
          const currentUserId = req.params.id;
          const users = await User.find({ _id: { $ne: currentUserId } });
          res.status(200).json(users);
        } catch (error) {
          console.error('Error fetching users:', error);
          res.status(500).json({ error: 'Internal server error' });
        }
      }
    ,
    
    fetchChat: async (req, res) => {
        try {
            const { senderId, receiverId } = req.params;
            if (!senderId || !receiverId) {
                return res.status(400).json({ error: 'Sender ID and Receiver ID are required' });
            }

            const messages = await ChatModel.find({ 
                $or: [
                    { sender: senderId, receiver: receiverId },
                    { sender: receiverId, receiver: senderId }
                ]
            }).sort({ timestamp: 1 });

            res.status(200).json(messages);
        } catch (error) {
            console.error('Error fetching messages between two users:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
  
      
};

module.exports = chatController;

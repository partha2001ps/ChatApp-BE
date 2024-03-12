const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
    message: String,
    timestamp: { type: Date, default: Date.now }
});

const ChatModel = mongoose.model('Chat', chatSchema);

module.exports = ChatModel;

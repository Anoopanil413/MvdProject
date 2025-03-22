import mongoose, { Schema } from 'mongoose';

const messageSchema = new mongoose.Schema({
    senderId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiverId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    sentAt: {
        type: Date,
        default: Date.now()
    },
    type: {
        type: String,
        enum: ['text', 'notification','email'],
        default: 'text'
    },
    read: {
        type: Boolean,
        default: false
      },
      status: {
        type: String,
        enum: ['sent', 'delivered', 'failed'],
        default: 'sent'
      },
});

const Message = mongoose.model('Message', messageSchema);

export default Message;
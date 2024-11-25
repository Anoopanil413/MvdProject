import Message from '../../infrastructure/orm/models/MessageModal.js';

class MessageRepository {


    async createMessageRecord(message) {
        try {
            const message = new Message(message);
            await message.save();

            return message;
        } catch (error) {
            throw new Error('Error creating message record: ' + error.message);
        }
    }


    async getMessagesByUserId(userId) {
        try {
            return await Message.find({ userId });
        } catch (error) {
            throw new Error('Error fetching messages: ' + error.message);
        }
    }
}

export default MessageRepository;
import Message from '../../infrastructure/orm/models/MessageModal.js';

class MessageRepository {


    async createMessageRecord(messageData) {
        try {
            const message = new Message(messageData);
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

export default new MessageRepository();
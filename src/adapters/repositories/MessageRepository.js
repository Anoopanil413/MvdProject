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
            return await Message.find({ receiverId: userId, type: 'notification', read: false })
                .populate({
                    path: 'senderId',
                    select: 'name phone phoneVisible',
                    transform: (doc) => {
                        if (doc.phoneVisible) {
                            return { name: doc.name, phone: doc.phone };
                        } else {
                            return { name: doc.name };
                        }
                    }
                });
        } catch (error) {
            throw new Error('Error fetching messages: ' + error.message);
        }
    }
    async markAllNotificatioRead(userId) {
        try {
            return await Message.updateMany({ receiverId: userId, type: 'notification' }, { read: true });
        } catch (error) {
            throw new Error('Error marking all notifications as read: ' + error.message);
        }
    }
}

export default new MessageRepository();
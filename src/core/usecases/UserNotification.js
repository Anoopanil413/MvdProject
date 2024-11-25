export default class UserNotification {
    constructor(notificationService, messageRepository,userRepository) {
        this.notificationService = notificationService;
        this.messageRepository = messageRepository;
        this.userRepository = userRepository;
    }

    async sendNotification(userId, message) {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        await this.notificationService.sendNotification(user.phone, message);
        const messageRecord = await this.messageRepository.createMessageRecord({
            userId: user.id,
            message,
        });
        return messageRecord;
    }
}

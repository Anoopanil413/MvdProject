import CustomError from "../../adapters/controllers/ErrorHandler.js";

export default class UserNotification {
    constructor(notificationService, messageRepository,userRepository) {
        this.notificationService = notificationService;
        this.messageRepository = messageRepository;
        this.userRepository = userRepository;
    }

    async sendNotificationToUser(userId, message) {
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

    generateEmailHtml(email, user) {
        return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: #f4f4f4;
                }
                .container {
                    width: 80%;
                    margin: 0 auto;
                    background-color: #fff;
                    padding: 20px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                h1 {
                    color: #333;
                }
                p {
                    font-size: 16px;
                    line-height: 1.5;
                    color: #666;
                }
                .footer {
                    margin-top: 20px;
                    font-size: 14px;
                    color: #999;
                }
            </style>
            <title>Notification</title>
        </head>
        <body>
            <div class="container">
                <h1>Let me go</h1>
                <p>${email.content}</p>
                <div class="footer">
                    Regards,<br>
                    ${user.email}
                </div>
            </div>
        </body>
        </html>
        `;
    }

    async sendEmail (userId, email) {
        const user = await this.userRepository.findById(userId);
        const receiverUser = await this.userRepository.findById(email.toId);
        if (!user||!receiverUser) throw new CustomError('User not foud', 400);
        
        const template = this.generateEmailHtml(email, user);
        const emailRecord ={
            from: user.email,
            to: receiverUser.to,
            subject :email.subject,
            html:template,
            attachments: email?.attachments
        }

        try {
            
            await this.notificationService.sendEmail(user.email, emailRecord);
        } catch (error) {
            throw new CustomError('Email not send', 400);
        }

        try {
        const emailMessageRecord = {
            senderId: userId,
            receiverId: email.toId,
            content: email.content,
            type: 'email'
        };

        await this.messageRepository.createMessageRecord(emailMessageRecord);
    } catch (error) {
        throw new CustomError('Email not send', 400);

    }

    return 'Email sent successfully';

    }
}

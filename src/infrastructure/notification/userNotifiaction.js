
import admin from 'firebase-admin';
export default class UserNotificationService{

    static sendNotification(phone, message){
        const payload = {
            notification: {
                title: message.title,
                body: message.body,
            }
        };

        payload.token = phone;

        admin.messaging().send(payload)
            .then(response => {
                console.log('Successfully sent message:', response);
            })
            .catch(error => {
                console.error('Error sending message:', error);
            });
    }
    

} 
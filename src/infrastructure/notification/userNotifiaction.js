import admin from "../../../firebase.js";
 class UserNotificationService{

     async sendNotification(token, message){
        if(!token) throw new Error('Token is required');
        if(!message) throw new Error('Message is required');
        const payload = {
            notification: {
                title: message.title,
                body: message.body,
            }
        };

        payload.token = token;
    try {
           return  await admin.messaging().send(payload)
        } catch (error) {
            throw new Error('Error sending notification: ' + error.message);
            
        }


    }


} 

export default new UserNotificationService();
import admin from "../../../firebase.js";
 class UserNotificationService{

    static async sendNotification(phone, message){
        const payload = {
            notification: {
                title: message.title,
                body: message.body,
            }
        };

        payload.token = phone;
    try {
           return  await admin.messaging().send(payload)
        } catch (error) {
            throw new Error('Error sending notification: ' + error.message);
            
        }


    }
    

} 

export default new UserNotificationService();
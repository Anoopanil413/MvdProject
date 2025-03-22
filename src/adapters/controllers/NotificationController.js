import userRepository from '../repositories/UserRepository.js';
import MessageRepository from '../repositories/MessageRepository.js';

class NotificationController {
    

  static async getNotifications(req, res) {

  }
  static getNotificationToken (req,res){

  }

  static async registerToken(req, res) {
    try {
      const {  token } = req.body;
      const {userId} = req;
      const useCase =  new UserNotification();

      
    } catch (error) {
      
    }
  }

  static async getUSerToken(req, res) {

  };

  static async sendNotificationToUser(req, res) {
  
  }

  

}

export default NotificationController;
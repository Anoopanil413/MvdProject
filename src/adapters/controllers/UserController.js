import RegisterUser from '../../core/usecases/RegisterUser.js';
import userRepository from '../repositories/UserRepository.js';
import LoginUser from '../../core/usecases/LoginUser.js';
import JwtService from '../../infrastructure/auth/JwtService.js';
import VerifyOtpAndLogin from '../../core/usecases/VerifyUser.js';
import UserVehicle from '../../core/usecases/UserVehicle.js';
import VehicleRepository from '../repositories/VehicleRepository.js';
import Fast2SmsOtpService from '../../infrastructure/twilio/SmsService.js'
import UserProfile from '../../core/usecases/UserProfile.js';
import UserNotification from '../../core/usecases/UserNotification.js';
import EmailService  from '../../infrastructure/nodemailer/nodemailer.confog.js';
import MessageRepository from '../repositories/MessageRepository.js'
import UserNotificationService from '../../infrastructure/notification/userNotifiaction.js';


class UserController {
  static async register(req, res) {
    try {
      const useCase = new RegisterUser(userRepository, Fast2SmsOtpService);
      const user = await useCase.execute(req.body);
      res.status(201).json({ user });
    } catch (error) {
      UserController.handleError(res, error);
    }
  }
  static async getUSer(req, res) {
    try {
      const useCase = new LoginUser(userRepository);
      const {userId} = req;
      const user = await useCase.verifyUSer(userId);
      res.status(201).json( {user} );
    } catch (error) {
      UserController.handleError(res, error);
    }
  }

  static async login(req, res) {
    try {
      const useCase = new LoginUser(userRepository, Fast2SmsOtpService);      
      const result = await useCase.execute(req.body);
      res.status(200).json(result);
    } catch (error) {
      UserController.handleError(res, error);
    }
  }

  static async setToken(req, res) {
    try {
      const useCase = new LoginUser(userRepository, Fast2SmsOtpService);  
      const {userId} = req;    
      const result = await useCase.setFcmToken(userId,req.body);
      res.status(200).json(result);
    } catch (error) {
      UserController.handleError(res, error);
    }
  }

  static async verifyOtp(req, res) {
    try {
      const useCase = new VerifyOtpAndLogin(userRepository, Fast2SmsOtpService, JwtService);
      const result = await useCase.execute(req.body);
      res.status(200).json(result);
    } catch (error) {
      UserController.handleError(res, error);
    }
  }

  static async updateProfile(req, res) {
    try {
      const useCase = new UserProfile(userRepository);
      const user = await useCase.updateProfile(req.userId, req.body);
      res.status(200).json({ user });
    } catch (error) {
      UserController.handleError(res, error);
    }
  }

  static async getMyVehicle(req, res) {
    try {
      const useCase = new UserVehicle(VehicleRepository, userRepository);
      const { userId } = req;
      const myVehicles = await useCase.getMyVehicles(userId);
      res.status(200).json(myVehicles);
    } catch (error) {
      UserController.handleError(res, error);
    }
  }

  static async createVehicle(req, res) {
    try {
      const useCase = new UserVehicle(VehicleRepository, userRepository);
      const { userId, body } = req;
      const vehicle = await useCase.addVehicleToUser(userId, body);
      res.status(201).json({ vehicle });
    } catch (error) {
      UserController.handleError(res, error);
    }
  }

  static async updateUserVehicle(req, res) {
    try {
      const useCase = new UserVehicle(VehicleRepository, userRepository);
      const { userId, body } = req;
      const updateVehicle = await useCase.updateVehicleDetails(userId, body);
      res.status(200).json(updateVehicle);
    } catch (error) {
      UserController.handleError(res, error);
    }
  }

  static async deleteVehicle(req, res) {
    try {
      const useCase = new UserVehicle(VehicleRepository, userRepository);
      const { userId, query } = req;
      const deleteVehicle = await useCase.deleteVehicle(userId, query);
      res.status(200).json(deleteVehicle);
    } catch (error) {
      UserController.handleError(res, error);
    }
  }

  static async getVehicleOwner(req, res) {
    try {
      const useCase = new UserVehicle(VehicleRepository, userRepository);
      const { userId, body } = req;
      const vehicleOwner = await useCase.getVehicleOwner(userId, body);
      res.status(200).json(vehicleOwner);
    } catch (error) {
      UserController.handleError(res, error);
    }
  }

  static async sendMessageToVehicleOwner(req, res) {
    try {
      const useCase = new UserProfile(userRepository, Fast2SmsOtpService, VehicleRepository);
      const { userId } = req;
      const message = await useCase.sendMessageToVehicleOwner(userId, req.body);
      res.status(200).json(message);
    } catch (error) {
      UserController.handleError(res, error);
    }
  }

  static async resendOtp(req, res) {
    try {
      
      const useCase = new UserProfile(userRepository, Fast2SmsOtpService);
      const result = await useCase.resetOtp(req.body);
      res.status(200).json(result);
    } catch (error) {
      UserController.handleError(res, error);
    }
  }
  
  static async handleSendEmail(req,res) {
    try {
      const messageRepo = new MessageRepository()

      const useCase  = new UserNotification(EmailService,messageRepo,userRepository)
      const {userId} = req;
      const message = await useCase.sendEmail(userId, req.body);
      res.status(200).json(message);

      
    } catch (error) {
      UserController.handleError(res, error);

    }
    
  }
  static async sendNotification(req,res) {
    try {
      const messageRepo = new MessageRepository()
      const useCase  = new UserNotification(UserNotificationService,messageRepo,userRepository)
      const {userId} = req;
      const message = await useCase.sendNotificationToUser(userId, req.body);
      res.status(200).json(message);

      
    } catch (error) {
      UserController.handleError(res, error);

    }
    
  }

  static handleError(res, error) {
    const statusCode = error.statusCode || 400;
    const message = error.message || 'An unexpected error occurred';
    res.status(statusCode).json({ error: message });
  }

}

export default UserController;

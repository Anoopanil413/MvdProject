import RegisterUser from '../../core/usecases/RegisterUser.js';
import userRepository from '../repositories/UserRepository.js';
import LoginUser from '../../core/usecases/LoginUser.js';
import JwtService from '../../infrastructure/auth/JwtService.js';
import VerifyOtpAndLogin from '../../core/usecases/VerifyUser.js';
import UserVehicle from '../../core/usecases/UserVehicle.js';
import VehicleRepository from '../repositories/VehicleRepository.js';
import Fast2SmsOtpService from '../../infrastructure/twilio/SmsService.js'
import UserProfile from '../../core/usecases/UserProfile.js';
import MessageRepository from '../repositories/MessageRepository.js';


class UserController {
  static async register(req, res) {
    try {
      const useCase = new RegisterUser(userRepository, Fast2SmsOtpService);
      const user = await useCase.execute(req.body);
      res.status(201).json({ user });
    } catch (error) {

      res.status(400).json({ error: error.message });
    }
  }
  



  static async login(req, res) {
    try {
      const useCase = new LoginUser(userRepository, Fast2SmsOtpService);      
      const result = await useCase.execute(req.body);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  static async verifyOtp(req, res) {
    try {
      const useCase = new VerifyOtpAndLogin(userRepository, Fast2SmsOtpService, JwtService);
      const result = await useCase.execute(req.body);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }


  static async updateProfile(req, res) {
    try {
      const useCase = new UserProfile(userRepository);
      const user = await useCase.updateProfile(req.body);
      res.status(200).json({ user });
    } catch (error) {
      res.status(400).json({ error: error.message }); 
  }
}

  // static async getVehicleOwner(req, res) {
  //   try {
  //     const useCase = new UserVehicle(VehicleRepository, userRepository);
  //     const {userId} = req;
  //     const vehicleOwner = await useCase.getVehicleOwner(userId);
  //     res.status(200).json(vehicleOwner);
  //   } catch (error) {
  //     res.status(400).json({ error: error.message });
  //   }
  // }

  static async getMyVehicle(req, res) {
  try {
    const useCase = new UserVehicle(VehicleRepository, userRepository);
    const {userId} = req;
    const myVehicles = await useCase.getMyVehicles(userId);
    res.status(200).json(myVehicles);
  
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async createVehicle(req, res) {
    try {
      const useCase = new UserVehicle( VehicleRepository,userRepository);
      const {userId,body} = req;
      const vehicle = await useCase.addVehicleToUser(userId,body);
      res.status(201).json({ vehicle });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async updateUserVehicle(req, res) {
    try {
    const usecase = new UserVehicle(VehicleRepository, userRepository);
    const {userId,body} = req;

    const updateVehicle = await usecase.updateVehicleDetails(userId,body);
      res.status(200).json(updateVehicle);
    } catch (error) { 
      res.status(400).json({ error: error.message });
    }
  }
  static async deleteVehicle(req, res) {
    try {
      const usecase = new UserVehicle(VehicleRepository, userRepository);
      const {userId,body} = req;

      const deleteVehicle = await usecase.deleteVehicle(userId,body);
      res.status(200).json(deleteVehicle);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getVehicleOwner(req, res) {
    try {
      const useCase = new UserVehicle(VehicleRepository, userRepository);
      const { userId,body} = req;
      const vehicleOwner = await useCase.getVehicleOwner(userId,body);
      res.status(200).json(vehicleOwner);
    } catch (error) {
      res.status(400).json({ error: error})
    }
  }

  static async sendMessageToVehicleOwner(req, res) {
    try {
      const useCase = new UserProfile(userRepository, Fast2SmsOtpService,VehicleRepository);
      const {userId} = req;
      const message = await useCase.sendMessageToVehicleOwner(userId,req.body);
      res.status(200).json(message);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async resendOtp(req, res) {
    try {
      const useCase = new UserProfile(userRepository, Fast2SmsOtpService);
      const result = await useCase.resetOtp(req.body);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  


}

export default UserController;

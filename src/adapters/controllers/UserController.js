import RegisterUser from '../../core/usecases/RegisterUser.js';
import userRepository from '../repositories/UserRepository.js';
import otpService from '../../infrastructure/twilio/OtpService.js';
import LoginUser from '../../core/usecases/LoginUser.js';
import JwtService from '../../infrastructure/auth/JwtService.js';
import VerifyOtpAndLogin from '../../core/usecases/VerifyUser.js';
import UpdatePrivacyPolicy from '../../core/usecases/UpdatePrivacyPolicy.js';
import CreateVehicle from '../../core/usecases/CreateVehicle.js';
import VehicleRepository from '../repositories/VehicleRepository.js';


class UserController {
  static async register(req, res) {
    try {
      const useCase = new RegisterUser(userRepository, otpService);
      const user = await useCase.execute(req.body);
      res.status(201).json({ user });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  
  static async createPrivacyPolicy(req, res) {
    try {
      const useCase = new UpdatePrivacyPolicy(userRepository);
      const userUpdate = await useCase.execute(req.body);
      res.status(200).json({ message: 'Privacy policy updated successfully', user });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }


  static async login(req, res) {
    try {
      const useCase = new LoginUser(userRepository, otpService);
      const result = await useCase.execute(req.body);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  static async verifyOtp(req, res) {
    try {
      const useCase = new VerifyOtpAndLogin(userRepository, otpService, JwtService);
      const result = await useCase.execute(req.body);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }


  static async updateProfile(req, res) {
    // Update user profile logic here
  }
  static async createVehicle(req, res) {
    try {
      const useCase = new CreateVehicle(userRepository, VehicleRepository);
      const vehicle = await useCase.execute(req.body);
      res.status(201).json({ vehicle });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default UserController;

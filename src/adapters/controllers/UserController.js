import RegisterUser from '../../core/usecases/RegisterUser.js';
import userRepository from '../repositories/UserRepository.js';
import otpService from '../../infrastructure/twilio/OtpService.js';
import LoginUser from '../../core/usecases/LoginUser.js';
import JwtService from '../../infrastructure/auth/JwtService.js';
import VerifyOtpAndLogin from '../../core/usecases/VerifyUser.js';


class UserController {
  static async register(req, res) {
    const useCase = new RegisterUser(userRepository, otpService);
    const user = await useCase.execute(req.body);
    res.status(201).json({ user });
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
}

export default UserController;

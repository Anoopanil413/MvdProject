import CustomError from "../../adapters/controllers/ErrorHandler.js";
export default class LoginUser {
    constructor(userRepository, otpService) {
      this.userRepository = userRepository;
      this.otpService = otpService; 
    }
  
    async execute({ phone }) {
      const user = await this.userRepository.findByPhoneNumber(phone);
      if (!user) {
        throw new Error('User not found');
      }
      try {
        await this.otpService.sendOtp(phone);
        return { message: `OTP sent to your phone number ${phone} for verification.`};
      } catch (error) {
        throw new CustomError('unable to send message, user verified', 202);
      }

    }

    async verifyUSer(userId) {
      const user = await this.userRepository.findById(userId);
      if (!user) {
        throw new CustomError('User not found', 404);
      }
      return user;
    }

    async   setFcmToken(userId, data) {
      const token = data.token;
      if (!token) {
        throw new CustomError('FCM token is required', 400);
      }
      const user = await this.userRepository.findById(userId);
      if (!user) {
        throw new CustomError('User not found', 404);
      }
      user.firebaseToken = token;
     const userData =  await this.userRepository.update(userId,user);
      return { message: 'FCM token updated successfully',userData};
    }
  }
  
  
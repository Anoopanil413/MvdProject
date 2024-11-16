// /src/core/usecases/LoginUser.js
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
        await this.otpService.sendOtp(phone);
  
      return { message: `OTP sent to your phone number ${phone} for verification.` };
    }
  }
  
  
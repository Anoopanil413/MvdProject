// /src/core/usecases/LoginUser.js
export default class LoginUser {
    constructor(userRepository, otpService) {
      this.userRepository = userRepository;
      this.otpService = otpService; 
    }
  
    async execute({ phoneNumber }) {
      const user = await this.userRepository.findByPhoneNumber(phoneNumber);
      if (!user) {
        throw new Error('User not found');
      }
        await this.otpService.sendOtp(phoneNumber);
  
      return { message: `OTP sent to your phone number ${phoneNumber} for verification.` };
    }
  }
  
  
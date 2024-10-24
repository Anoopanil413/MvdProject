import User from "../domain/entities/User.js";

export default class RegisterUser {
    constructor(userRepository, otpService) {
      this.userRepository = userRepository;
      this.otpService = otpService; // Injecting Twilio OTP service
    }
    async execute(userData) {
      // Check if the user already exists
      const existingUser = await this.userRepository.findByPhoneNumber(userData.phoneNumber);
      if (existingUser) {
        throw new Error('User with this phone number already exists');
      }
  
      // Create a new user entity
      const newUser = new User(
        null,
        userData.name,
        userData.phoneNumber,
        userData.email || null,
        userData.isPhoneVisible || false
      );
  
      // Save the new user in the database
      const savedUser = await this.userRepository.create(newUser);
  
      // Send OTP for verification
      await this.otpService.sendOtp(savedUser.phone);
  
      return savedUser;
    }
  }
  
import CustomError from "../../adapters/controllers/ErrorHandler.js";
import User from "../domain/entities/User.js";

export default class RegisterUser {
  constructor(userRepository, otpService) {
    this.userRepository = userRepository;
    this.otpService = otpService; // Injecting Twilio OTP service
  }
  async execute(userData) {

    const existingUser = await this.userRepository.findByPhoneNumber(userData.phone);
    if (existingUser) {
       throw new CustomError('User with this phone number already exists', 409);
    }
  
    const newUser = new User(
      null,
      userData.name,
      userData.phone,
      userData.email,
      userData.gender,
      userData.dateOfBirth,
      userData.location,
      userData.city,
    );
  
    // Save the new user in the database
    const savedUser = await this.userRepository.create(newUser);

    if(!savedUser){
      throw new CustomError('User could not be created', 503)
    }
     try {
       await this.otpService.sendOtp(savedUser.phone);
     } catch (error) {
      throw new CustomError('User registered but OTP could not be sent. Please try resending OTP.', 202);
     }

    return savedUser;

  }
  }
  
import CustomError from "../../adapters/controllers/ErrorHandler.js";
export default class UserProfile {
    constructor(userRepository,otpService,vehicleRepository=null) {
      this.userRepository = userRepository;
      this.otpService = otpService;
      this.vehicleRepository = vehicleRepository;

    }
  
    async updateProfile(userId, updates) {
      const user = await this.userRepository.findById(userId);
      if (!user) {
      throw new Error('User not found');
      }
    
      if (updates.name) user.name = updates.name;
      if (updates.email) user.email = updates.email;
      if (typeof updates.phoneVisible !== 'undefined') user.phoneVisible = updates.phoneVisible;
      // if (typeof updates.isNameVisible !== 'undefined') user.isNameVisible = updates.isNameVisible;
      if (updates.firebaseToken) user.firebaseToken = updates.firebaseToken;
    
      const updatedUser = await this.userRepository.update(userId, user);
    
      return updatedUser;
    }
    async sendMessageToVehicleOwner(userId, data) {
      if (typeof data.message !== 'string' || data.message.trim() === '') {
        throw new CustomError('Message must be a non-empty string', 400);
      }
      const user = await this.userRepository.findById(userId);
      if (!user) {
        throw new CustomError('User not found', 404);
      }
      const vehicle = await this.vehicleRepository.getVehicleByIdAndUserId(data.vehicleId, data.userId);
      if (!vehicle) {
        throw new CustomError('Vehicle not found with user', 404);
      }
      const vehicleOwner = await this.userRepository.findById(vehicle.userId);
      if (!vehicleOwner) {
        throw new CustomError('Vehicle owner not found', 404);
      }
      let message;
      if (user.phoneVisible) {
        message = `${data.message} from \n${user.phone}`;
      } else {
        message = `${data.message} from \n${user.name}`;
      }
      data.message = message;
      try {
        await this.otpService.sendMessage(vehicleOwner.phone, data.message, userId, data.userId);
      } catch (error) {
        throw new CustomError('Failed to send message to vehicle owner', 500);
      }
      const ownerDetails = vehicleOwner.phoneVisible ? vehicleOwner.phone : vehicleOwner.name;
      return { message: `Message sent to vehicle owner phone number ${ownerDetails}` };
    }

  async resetOtp(userData) {
    const user = await this.userRepository.findByPhoneNumber(userData.phone);
    if (!user) {
      throw new Error('User not found');
    }
    await this.otpService.resendOtp(user.phone);
    return { message: `OTP sent to your phone number ${user.phone} for verification.` };  

  }
}
  
  
// /src/core/usecases/UpdateUserProfile.js
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
    async sendMessageToVehicleOwner(userId,data) {
      try {
        if (typeof data.message !== 'string' || data.message.trim() === '') {
          throw new Error('Message must be a non-empty string');
        }
        const user = await this.userRepository.findById(userId);
        if (!user) {
          throw new Error('User not found');
        }
        const vehicle = await this.vehicleRepository.getVehicleByIdAndUserId(data.vehicleId,data.userId);
        if (!vehicle) {
          throw new Error('Vehicle not found with user');
        }
        const vehicleOwner = await this.userRepository.findById(vehicle.userId);
        if (!vehicleOwner) {
          throw new Error('Vehicle owner not found');
        }
        let message;
        if (user.phoneVisible) {
          message = `${data.message} from ${user.phone}`;
        } else {
          message = `${data.message} from ${user.name}`;
        }
        data.message = message;
        await this.otpService.sendMessage(vehicleOwner.phone,data.message,userId,data.userId);
        const ownerdetails =vehicleOwner.phoneVisible?vehicleOwner.phone:vehicleOwner.name;
        return { message: `Message sent to vehicle owner phone number ${ownerdetails}` };

      } catch (error) {
        console.error('Error sending message to vehicle owner:', error);
        throw new Error('Error sending message to vehicle owner');
          
      }

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
  
  
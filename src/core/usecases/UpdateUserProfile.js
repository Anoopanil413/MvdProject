// /src/core/usecases/UpdateUserProfile.js
export default class UpdateUserProfile {
    constructor(userRepository) {
      this.userRepository = userRepository;
    }
  
    async execute(userId, updates) {
      // Find the user by ID
      const user = await this.userRepository.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }
  
      // Update the user's profile
      if (updates.name) user.name = updates.name;
      if (updates.email) user.email = updates.email;
      if (typeof updates.isPhoneVisible !== 'undefined') user.isPhoneVisible = updates.isPhoneVisible;
  
      // Save the updated user profile
      const updatedUser = await this.userRepository.update(userId, user);
  
      return updatedUser;
    }
  }
  
  
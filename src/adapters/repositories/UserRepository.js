import UserModel from '../../infrastructure/orm/models/UserModel.js';

class UserRepository {
  async create(user) {
    const userDoc = new UserModel(user);
    await userDoc.save();
    return user;
  }

  async findByPhoneNumber(phone) {
    return await UserModel.findOne({ phone });
  }


  // Other repository methods for updating, deleting, etc.
}

export default new UserRepository();

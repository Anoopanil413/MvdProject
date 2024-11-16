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

  async findById(id) {
    return await UserModel.findById(id);
  }

  async save(user) {
    const existingUser = await this.findById(user.id);
    if (existingUser) {
      Object.assign(existingUser, user);
      await existingUser.save();
      return existingUser;
    } else {
      return await this.create(user);
    }
  }


  // Other repository methods for updating, deleting, etc.
}

export default new UserRepository();

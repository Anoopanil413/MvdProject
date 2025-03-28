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

  async removeRegisteredVehicle(userId, vehicleID) {
    const user = await UserModel.findById(userId);
    if (user) {
      user.registeredVehicles = user.registeredVehicles.filter(id => id.toString() !== vehicleID.toString());
      await user.save();
      return user;
    }
    throw new Error('User not found');
  }
  async update(id, userData) {
    const user = await this.findById(id);
    if (user) {
      Object.assign(user, userData);
      await user.save();
      return user;
    }
    throw new Error('User not found');
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
  async addRegisteredVehicle(userId, vehicleID) {
    const user = await UserModel.findById(userId);
    if (user) {
      user.registeredVehicles.push(vehicleID);
      await user.save();
      return user;
    }
    throw new Error('User not found');
  }

  async getVehicleByUserId(userId) {
    const user = await UserModel.findById(userId).populate('registeredVehicles');
    if (user) {
      return user.registeredVehicles;
    }
    throw new Error('User not found');
  }
  async getTokenByUserId(userId) {
    const userData =  await UserModel.findById(userId);
    return userData.firebaseToken;
    }
    async saveToken(userId, token) {
        const user = await UserModel.findById(userId);
        user.firebaseToken = token;
        await user.save();
        return user;
    }
    async removeToken(userId) {
        const user = await UserModel.findById(userId);
        user.firebaseToken = false;
        await user.save();
        return user;
    }


}

export default new UserRepository();

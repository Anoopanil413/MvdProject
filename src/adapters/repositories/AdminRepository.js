import AdminModel from '../../infrastructure/orm/models/AdminModel.js';

class AdminRepository {
  async save(admin) {
    const adminDoc = new AdminModel(admin);
    await adminDoc.save();
    return admin;
  }

  async findById(id) {
    return await AdminModel.findById(id);
  }

  async findByUsername(username) {
    return await AdminModel.findOne({ username });
  }

  async update(admin) {
    return await AdminModel.findByIdAndUpdate(admin.id, admin, { new: true });
  }
}

export default new AdminRepository();

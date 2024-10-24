// ManageAdmin.js content
// /src/core/usecases/ManageAdmin.js

import Admin from '../domain/entities/Admin.js'

class ManageAdmin {
  constructor(adminRepository, jwtService) {
    this.adminRepository = adminRepository;
    this.jwtService = jwtService;
  }

  async createAdmin(adminData) {
    const admin = new Admin(null, adminData.username, adminData.password);
    return await this.adminRepository.save(admin);
  }

  async verifyAdmin(adminId) {
    const admin = await this.adminRepository.findById(adminId);
    if (!admin) throw new Error('Admin not found');
    
    admin.isVerified = true;
    return await this.adminRepository.update(admin);
  }

  async loginAdmin(credentials) {
    const admin = await this.adminRepository.findByUsername(credentials.username);
    if (!admin || !admin.validatePassword(credentials.password)) {
      throw new Error('Invalid credentials');
    }

    const token = this.jwtService.generateToken(admin);
    return { admin, token };
  }
}

module.exports = ManageAdmin;

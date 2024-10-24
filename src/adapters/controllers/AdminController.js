import ManageAdmin from '../../core/usecases/ManageAdmin.js';
import adminRepository from '../repositories/AdminRepository.js';
import jwtService from '../../infrastructure/auth/JwtService.js';

class AdminController {
  static async createAdmin(req, res) {
    const useCase = new ManageAdmin(adminRepository, jwtService);
    const admin = await useCase.createAdmin(req.body);
    res.status(201).json({ admin });
  }

  static async loginAdmin(req, res) {
    const useCase = new ManageAdmin(adminRepository, jwtService);
    const result = await useCase.loginAdmin(req.body);
    res.status(200).json(result);
  }

  static async verifyAdmin(req, res) {
    const useCase = new ManageAdmin(adminRepository, jwtService);
    const admin = await useCase.verifyAdmin(req.params.adminId);
    res.status(200).json({ admin });
  }
}

export default AdminController;

import VehicleModel from '../../infrastructure/orm/models/VehicleModel.js';
import UserModel from '../../infrastructure/orm/models/UserModel.js';

// VehicleRepository.js content
class VehicleRepository {
    async getVehicleByNumber(vehicleNumber) {
        try {
            return await VehicleModel.findAll({ where: { vehicleNumber } });
        } catch (error) {
            console.error('Error fetching vehicle by number:', error);
            throw error;
        }
    }
    async getVehicleByNUmberAndUserId(vehicleNumber,userId) {
        try {
            return await VehicleModel.findOne({ where: {  vehicleNumber, userId } });
        } catch (error) {
            console.error('Error fetching vehicle by number:', error);
            throw error;
        }
    }
    async getVehicleByIdAndUserId(vehicleId, userId) {
        try {
            return await VehicleModel.findOne({ where: { id: vehicleId, userId } });
        } catch (error) {
            console.error('Error fetching vehicle by ID and user ID:', error);
            throw error;
        }
    }

    async createVehicle(vehicleData,userId) {
        try {
            
            const newvehicleData = {...vehicleData,userId};
            return await VehicleModel.create(newvehicleData);
        } catch (error) {
            console.error('Error creating vehicle:', error);
            throw error;
        }
    }

    async getAllVehicles() {
        try {
            return await VehicleModel.findAll();
        } catch (error) {
            console.error('Error fetching all vehicles:', error);
            throw error;
        }
    }

    async updateVehicle(vehicleId, updateData) {
        try {
            const vehicle = await VehicleModel.findById(vehicleId);
            if (vehicle) {
                return await vehicle.update(updateData);
            }
            throw new Error('Vehicle not found');
        } catch (error) {
            console.error('Error updating vehicle:', error);
            throw error;
        }
    }

    async deleteVehicle(vehicleId) {
        try {
            const vehicle = await VehicleModel.findById(vehicleId);
            if (vehicle) {
                return await vehicle.destroy();
            }
            throw new Error('Vehicle not found');
        } catch (error) {
            console.error('Error deleting vehicle:', error);
            throw error;
        }
    }

    // Other repository methods for updating, deleting, etc.
}

export default new VehicleRepository();
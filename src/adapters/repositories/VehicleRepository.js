import VehicleModel from '../../infrastructure/orm/models/VehicleModel.js';
import UserModel from '../../infrastructure/orm/models/UserModel.js';

// VehicleRepository.js content
class VehicleRepository {
    async getVehicleByNumber(vehicleNumber) {
        try {
            return await VehicleModel.findOne({ where: { number: vehicleNumber } });
        } catch (error) {
            console.error('Error fetching vehicle by number:', error);
            throw error;
        }
    }

    async createVehicle(vehicleData) {
        try {
            return await VehicleModel.create(vehicleData);
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

    async updateVehicle(vehicleNumber, updateData) {
        try {
            const vehicle = await VehicleModel.findOne({ where: { number: vehicleNumber } });
            if (vehicle) {
                return await vehicle.update(updateData);
            }
            throw new Error('Vehicle not found');
        } catch (error) {
            console.error('Error updating vehicle:', error);
            throw error;
        }
    }

    async deleteVehicle(vehicleNumber) {
        try {
            const vehicle = await VehicleModel.findOne({ where: { number: vehicleNumber } });
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
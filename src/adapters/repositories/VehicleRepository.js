import VehicleModel from '../../infrastructure/orm/models/VehicleModel.js';
import UserModel from '../../infrastructure/orm/models/UserModel.js';

// VehicleRepository.js content
class VehicleRepository {
    async getVehicleByNumber(vehicleNumber) {
        try {
            return await VehicleModel.find({ vehicleNumber });
        } catch (error) {
            console.error('Error fetching vehicle by number:', error);
            throw error;
        }
    }
    async getVehicleWithUserDataByNumber(vehicleNumber) {
        try {
            const vehicles = await VehicleModel.find({ vehicleNumber: vehicleNumber.toString().toLowerCase().trim() }).populate({
              path: 'userId',
              select: 'phone name email location city phoneVisible', 
            });
        
            // Process to exclude phone when phoneVisible is false
            const processedVehicles = vehicles.map((vehicle) => {
              if (vehicle.userId && !vehicle.userId.phoneVisible) {
                const { phone, ...userWithoutPhone } = vehicle.userId._doc;
                return { ...vehicle._doc, userId: userWithoutPhone };
              }
              return vehicle;
            });
        
            if (!processedVehicles.length) {
              return { message: 'No vehicles found with the given vehicle number' };
            }
        
            return processedVehicles;
          } catch (error) {
            console.error('Error fetching vehicle details:', error);
            throw new Error('Error retrieving vehicle details');
          }
    }
    
    async getVehicleByNUmberAndUserId(vehicleNumber,userId) {
        try {
            const vehicleUser = await VehicleModel.findOne({ vehicleNumber:vehicleNumber.toString().toLowerCase(), userId });
            return vehicleUser
        } catch (error) {
            console.error('Error fetching vehicle by number:', error);
            throw error;
        }
    }
    async getVehicleByIdAndUserId(vehicleId, userId) {
        try {
            const vehicle = await VehicleModel.findOne({ _id:vehicleId, userId: userId });
            return vehicle;
        } catch (error) {
            console.error('Error fetching vehicle by ID and user ID:', error);
            throw error;
        }
    }

    async createVehicle(vehicleData,userId) {
        try {
            
            const newvehicleData = { ...vehicleData, vehicleNumber: vehicleData.vehicleNumber.toLowerCase(), userId };
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
                return await VehicleModel.findByIdAndUpdate(vehicleId, updateData, { new: true });
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
                return await VehicleModel.findByIdAndDelete(vehicleId);
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
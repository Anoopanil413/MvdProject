import CustomError from "../../adapters/controllers/ErrorHandler.js";
export default class UserVehicle {
    constructor(vehicleRepository, userRepository) {
        this.vehicleRepository = vehicleRepository;
        this.userRepository = userRepository;
    }

    async addVehicleToUser(userId, vehicle) {

        const vehicleNumberPattern = /^[A-Z]{2}[0-9]{2}[A-Z0-9]{1,2}[0-9]{4}$/i;

        if (!vehicleNumberPattern.test(vehicle.vehicleNumber)) {
            throw new CustomError('Invalid vehicle number', 400);
        }
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new CustomError('User not found', 404);
        }
        const vehicleRegistry = await this.vehicleRepository.getVehicleByNUmberAndUserId(vehicle.vehicleNumber, userId);
        if (vehicleRegistry) {
            throw new CustomError('Vehicle already registered with this user', 409);
        }
        let vehicleDoc;
        try {
            vehicleDoc = await this.vehicleRepository.createVehicle(vehicle, userId);
        } catch (error) {
            throw new CustomError('Error creating vehicle', 500);
        }

        try {
            await this.userRepository.addRegisteredVehicle(userId, vehicleDoc._id);
        } catch (error) {
            throw new CustomError('Error adding vehicle to user', 500);
        }
        return vehicleDoc;
                    
    }

    async getMyVehicles(userId) {
        try {
        const user = await this.userRepository.getVehicleByUserId(userId);
        if (!user) {
            throw new CustomError('User not found', 404);
        }
        return user;
    } catch (error) {
        throw new CustomError('User not found', 404);
    }
    }

    async updateVehicleDetails( userId,updatedDetails) {
        try {
            

        const vehicleNumberPattern = /^[A-Z]{2}[0-9]{2}[A-Z0-9]{1,2}[0-9]{4}$/i;
        if (updatedDetails.vehicleNumber && !vehicleNumberPattern.test(updatedDetails.vehicleNumber)) {
            throw new Error('Invalid vehicle number');
        }

        const getUsersExistingVehicle =await this.vehicleRepository.getVehicleByIdAndUserId( updatedDetails.id,userId);
        if(!getUsersExistingVehicle)throw new Error('Vehicle not found with this user');
        if(updatedDetails.vehicleNumber !== getUsersExistingVehicle.vehicleNumber){
            const vehicleRegistry = await this.vehicleRepository.getVehicleByNUmberAndUserId(updatedDetails.vehicleNumber,userId);
            if(vehicleRegistry){
                throw new Error('Vehicle already registered with this user');
        }
        
    }

        const updatedVehicle = await this.vehicleRepository.updateVehicle(getUsersExistingVehicle._id, updatedDetails);
        return updatedVehicle;
    } catch (error) {
        throw error;
        
    }
    }

    async deleteVehicle(userId,data) {
        try {        
        const vehicle = await this.vehicleRepository.getVehicleByIdAndUserId(data.id,userId);
        if (!vehicle) {
            throw new Error('Vehicle not registered to this user');
        }
        await this.vehicleRepository.deleteVehicle(vehicle._id);
        await this.userRepository.removeRegisteredVehicle(userId,vehicle._id)
        return { message: 'Vehicle deleted successfully' };
    } catch (error) {
        throw error;
        
    }
    }

    async getVehicleOwner(userId,vehicle) {
        let user

        try {
            user = await this.userRepository.findById(userId);
            if(!user) throw new CustomError('User not found', 404);
        } catch (error) {
            throw new CustomError('User not found', 404);

        }
        let existingVehicle
            try {
                existingVehicle = await this.vehicleRepository.getVehicleWithUserDataByNumber(vehicle.vehicleNumber);
            } catch (error) {
                throw new CustomError('Vehicle not found with any user', 404);
            }
            return existingVehicle;

    }


}

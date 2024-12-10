// /src/core/usecases/CreateVehicle.js
export default class UserVehicle {
    constructor(vehicleRepository, userRepository) {
        this.vehicleRepository = vehicleRepository;
        this.userRepository = userRepository;
    }

    async addVehicleToUser(userId, vehicle) {
        try {

        const vehicleNumberPattern = /^[A-Z]{2}[0-9]{2}[A-Z0-9]{1,2}[0-9]{4}$/i;

        if (!vehicleNumberPattern.test(vehicle.vehicleNumber)) {
            throw new Error('Invalid vehicle number');
        }
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        const vehicleRegistry = await this.vehicleRepository.getVehicleByNUmberAndUserId(vehicle.vehicleNumber,userId);
        if(vehicleRegistry){
            throw new Error('Vehicle already registered with this user');
        }
        const vehicleDoc = await this.vehicleRepository.createVehicle(vehicle,userId);
        await this.userRepository.addRegisteredVehicle(userId, vehicleDoc._id);
        return vehicleDoc;
                    
    } catch (error) {
        throw error;
    }
    }

    async getMyVehicles(userId) {
        try {

        const user = await this.userRepository.getVehicleByUserId(userId);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    } catch (error) {
            throw error;
    }
    }

    async updateVehicleDetails( userId,updatedDetails) {
        try {
            

        const vehicleNumberPattern = /^[A-Z]{2}[0-9]{2}[A-Z0-9]{1,2}[0-9]{4}$/i;
        if (updatedDetails.vehicleNumber && !vehicleNumberPattern.test(updatedDetails.vehicleNumber)) {
            throw new Error('Invalid vehicle number');
        }

        const getUsersExistingVehicle =await this.vehicleRepository.getVehicleByIdAndUserId( updatedDetails._id,userId);
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
        
        const vehicle = await this.vehicleRepository.getVehicleByIdAndUserId(data._id,userId);
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
        try {
            
            const existingVehicle = await this.vehicleRepository.getVehicleWithUserDataByNumber(vehicle.vehicleNumber);
            if (!existingVehicle || existingVehicle.length == 0) throw new Error('Vehicle not found with any user');
            return existingVehicle;
        } catch (error) {
            throw error;
        }
            
    }


}

// /src/core/usecases/CreateVehicle.js
export default class UserVehicle {
    constructor(vehicleRepository, userRepository) {
        this.vehicleRepository = vehicleRepository;
        this.userRepository = userRepository;
    }

    async addVehicleToUser(userId, vehicle) {
        const vehicleNumberPattern = /^[A-Z]{2}[0-9]{2}[A-Z0-9]{1,2}[0-9]{4}$/i;

        if (!vehicleNumberPattern.test(vehicle.vehicleNumber)) {
            throw new Error('Invalid vehicle number');
        }
        const existingVehicle = await this.vehicleRepository.getVehicleByNumber( vehicle.vehicleNumber); 
        if (existingVehicle) throw new Error('Vehicle is already registered');
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        const vehicleDoc = await this.vehicleRepository.createVehicle(vehicle,userId);

        user.registeredVehicles.push(vehicleDoc._id);
        await this.userRepository.save(user);

        return vehicleDoc;
    }

    async updateVehicleDetails( userId,updatedDetails) {
        const vehicleNumberPattern = /^[A-Z]{2}[0-9]{2}[A-Z0-9]{1,2}[0-9]{4}$/i;
        if (updatedDetails.vehicleNumber && !vehicleNumberPattern.test(updatedDetails.vehicleNumber)) {
            throw new Error('Invalid vehicle number');
        }

        const existingVehicle = await this.vehicleRepository.getVehicleById(updatedDetails.vehicleId);
        if (!existingVehicle)throw new Error('Vehicle not found');

        const getUsersExistingVehicle =await this.vehicleRepository.getVehicleByNUmberAndUserId( existingVehicle.vehicleNumber,userId);
        if(!getUsersExistingVehicle)throw new Error('Vehicle not found with this user');

        const updatedVehicle = await this.vehicleRepository.updateVehicle(existingVehicle._id, updatedDetails);
        return updatedVehicle;
    }

    async deleteVehicle(userId,data) {
        const vehicle = await this.vehicleRepository.getVehicleByNUmberAndUserId(data.vehicleNumber,userId);
        if (!vehicle) {
            throw new Error('Vehicle not registered to this user');
        }

        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        await this.vehicleRepository.deleteVehicle(vehicle._id);
        
            user.registeredVehicles = user.registeredVehicles.filter(id => id.toString() !== vehicle._id.toString());
            await this.userRepository.save(user);
        

        return { message: 'Vehicle deleted successfully' };
    }

    async getVehicleOwner(userId,vehicle) {
        try {
            
            const existingVehicle = await this.vehicleRepository.getVehicleByNumber(vehicle.vehicleNumber);
            if(!existingVehicle)throw new Error('Vehicle not found with any user');
            const user = await this.userRepository.findById(existingVehicle.userId);
            if (!user) {
                throw new Error('User not found');
            }
            const userDetails = {
                name: user.name,
                email: user.email,
                gender: user.gender,
                dateOfBirth: user.dateOfBirth,
                location: user.location,
                city: user.city,
                registeredVehicles: user.registeredVehicles,
                isVerified: user.isVerified
            };
            if (user.phoneVisible) {
                userDetails.phone = user.phone;
            }
            
            return userDetails;
        } catch (error) {
            throw error;
        }
            
    }


}

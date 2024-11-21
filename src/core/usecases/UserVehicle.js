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
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        const vehicleDoc = await this.vehicleRepository.createVehicle(vehicle,userId);
        console.log('cvehicleDoc',vehicleDoc)
        return vehicleDoc;
    }

    async updateVehicleDetails( userId,updatedDetails) {
        const vehicleNumberPattern = /^[A-Z]{2}[0-9]{2}[A-Z0-9]{1,2}[0-9]{4}$/i;
        if (updatedDetails.vehicleNumber && !vehicleNumberPattern.test(updatedDetails.vehicleNumber)) {
            throw new Error('Invalid vehicle number');
        }

        const getUsersExistingVehicle =await this.vehicleRepository.getVehicleByNUmberAndUserId( existingVehicle.vehicleNumber,userId);
        if(!getUsersExistingVehicle)throw new Error('Vehicle not found with this user');
        console.log("hellooo update vehicel",getUsersExistingVehicle)

        const updatedVehicle = await this.vehicleRepository.updateVehicle(getUsersExistingVehicle._id, updatedDetails);
        return updatedVehicle;
    }

    async deleteVehicle(userId,data) {
        const vehicle = await this.vehicleRepository.getVehicleByNUmberAndUserId(data.vehicleNumber,userId);
        if (!vehicle) {
            throw new Error('Vehicle not registered to this user');
        }
        await this.vehicleRepository.deleteVehicle(vehicle._id);
        await this.userRepository.removeRegisteredVehicle(userId,vehicle._id)
        return { message: 'Vehicle deleted successfully' };
    }

    async getVehicleOwner(userId,vehicle) {
        try {
            
            const existingVehicle = await this.vehicleRepository.getVehicleByNumber(vehicle.vehicleNumber);
            if (!existingVehicle || existingVehicle.length == 0) throw new Error('Vehicle not found with any user');
            
            const userList = await Promise.all(existingVehicle.map(async (vehicleObj) => {
                const user = await this.userRepository.findById(vehicleObj.userId);
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
                return {
                    ...vehicleObj,
                    userDetails
                };
            }));
            const user = await this.userRepository.findById(existingVehicle.userId);

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

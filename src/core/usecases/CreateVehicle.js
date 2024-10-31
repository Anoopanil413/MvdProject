// /src/core/usecases/CreateVehicle.js
export default class CreateVehicle {
    constructor(vehicleRepository, userRepository) {
        this.vehicleRepository = vehicleRepository;
        this.userRepository = userRepository;
    }

    async addVehicleToUser(vehicle) {
        const existingVehicle = await this.vehicleRepository.findOne({ vehicleNumber: vehicle.vehicleNumber });
        if (existingVehicle) {
            if (existingVehicle.userId.toString() === vehicle.userId.toString()) {
                throw new Error('Vehicle is already registered');
            }
        }

        const user = await this.userRepository.findById(vehicle.userId);
        if (!user) {
            throw new Error('User not found');
        }

        const vehicleDoc = await this.vehicleRepository.create(vehicle);

        user.registeredVehicles.push(vehicleDoc._id);
        await this.userRepository.save(user);

        return vehicleDoc;
    }
}

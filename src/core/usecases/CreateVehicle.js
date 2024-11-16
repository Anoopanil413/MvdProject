// /src/core/usecases/CreateVehicle.js
export default class CreateVehicle {
    constructor(vehicleRepository, userRepository) {
        this.vehicleRepository = vehicleRepository;
        this.userRepository = userRepository;
    }

    async addVehicleToUser(vehicle) {
        const vehicleNumberPattern = /^[A-Z]{2}[0-9]{2}[A-Z0-9]{1,2}[0-9]{4}$/i;
        if (!vehicleNumberPattern.test(vehicle.vehicleNumber)) {
            throw new Error('Invalid vehicle number');
        }
        const existingVehicle = await this.vehicleRepository.getVehicleByNumber( vehicle.vehicleNumber );
        if (existingVehicle) {
            if (existingVehicle.userId.toString() === vehicle.userId.toString()) {
                throw new Error('Vehicle is already registered');
            }
        }

        const user = await this.userRepository.findById(vehicle.userId);
        if (!user) {
            throw new Error('User not found');
        }

        const vehicleDoc = await this.vehicleRepository.createVehicle(vehicle);

        user.registeredVehicles.push(vehicleDoc._id);
        await this.userRepository.save(user);

        return vehicleDoc;
    }
}

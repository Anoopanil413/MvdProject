import mongoose from 'mongoose';

const { Schema } = mongoose;

const vehicleSchema = new Schema({
    vehicleType: {
        type: String,
        enum: ['Four', 'Three', 'Two', 'Heavy'],
        required: true
    },
    name: {
        type: String,
        required: false
    },
    vehicleNumber: {
        type: String,
        required: true,
        match: /^[a-zA-Z0-9]{1,10}$/
    },
    isActive: {
        type: Boolean,
        default: true
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } 

});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

export default Vehicle;
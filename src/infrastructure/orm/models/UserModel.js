import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  phone: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true }, 
  gender: { type: String, required: true, enum: ['Male', 'Female', 'Other'] },
  dateOfBirth: { type: Date, required: true },
  location: { type: String, required: true },
  city: { type: String, required: true },
  phoneVisible: { type: Boolean, default: true },
  registeredVehicles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' }],
  isVerified: { type: Boolean, default: false }, 
});

export default mongoose.model('User', userSchema);

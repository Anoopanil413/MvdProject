import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  phone: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String },
  phoneVisible: { type: Boolean, default: true },
  registeredVehicles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' }],
});

export default mongoose.model('User', userSchema);

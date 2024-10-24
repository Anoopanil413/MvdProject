import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300, // TTL set to 300 seconds (5 minutes)
  },
});

// Ensure TTL index is created on `createdAt`
otpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 300 });

const Otp = mongoose.model('Otp', otpSchema);
export default Otp;

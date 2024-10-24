import twilio from 'twilio';
import Otp from '../orm/models/OtpModel.js';

class TwilioOtpService {
  constructor() {
    this.client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
  }

  generateOtp() {
    return Math.floor(100000 + Math.random() * 900000); 
  }

  async sendOtp(phoneNumber) {
    const otpCode = this.generateOtp();

    // Store the OTP in MongoDB with TTL
    const otpEntry = new Otp({
      phoneNumber,
      otp: otpCode,
    });

    await otpEntry.save();

    return this.client.messages.create({
      body: `Your OTP code is ${otpCode}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber,
    });
  }

  async verifyOtp(phoneNumber, enteredOtp) {
    const otpRecord = await Otp.findOne({ phoneNumber });

    if (!otpRecord) {
      throw new Error('OTP expired or not found.');
    }

    if (otpRecord.otp !== enteredOtp) {
      throw new Error('Invalid OTP.');
    }

    await Otp.deleteOne({ phoneNumber });

    return true;
  }
}

export default new TwilioOtpService();

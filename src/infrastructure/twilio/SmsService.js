// SmsService.js content

import axios from 'axios';
import Otp from '../orm/models/OtpModel.js';

class Fast2SmsOtpService {
  constructor() {
    this.apiKey = process.env.FAST2SMS_API_KEY;
    this.baseUrl =process.env.FAST2SMS_BASE_URL;
  }

  generateOtp() {
    return Math.floor(100000 + Math.random() * 900000); 
  }

  async sendOtp(phone) {
    const otpCode = this.generateOtp();

    // Store the OTP in MongoDB with TTL
    const otpEntry = new Otp({
      phone,
      otp: otpCode,
    });

    await otpEntry.save();

    const message = `Your OTP code is ${otpCode}`;
    const payload = {
      route: 'q',
      message: message,
      language: 'english',
      flash: 0,
      numbers: phone,
      sender_id: 'TXTIND',
    };

    const headers = {
      'authorization': this.apiKey,
      'Content-Type': 'application/json',
    };

    // Send OTP using Fast2SMS API
    const response = await axios.post(this.baseUrl, payload, { headers });

    if (response.data && response.data.return !== true) {
      throw new Error('Failed to send OTP via Fast2SMS');
    }

    return response.data;
  }

  async verifyOtp(phone, enteredOtp) {
    const otpRecord = await Otp.findOne({ phone });

    if (!otpRecord) {
      throw new Error('OTP expired or not found.');
    }

    if (otpRecord.otp !== enteredOtp) {
      throw new Error('Invalid OTP.');
    }

    await Otp.deleteOne({ phone });

    return true;
  }
}

export default new Fast2SmsOtpService();

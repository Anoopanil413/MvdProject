// SmsService.js content

import axios from 'axios';
import Otp from '../orm/models/OtpModel.js';
import Message from '../orm/models/MessageModal.js';

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
    const otpRecord = await Otp.findOne({ phone });
    if(otpRecord){
      return {message: 'OTP already sent'};
    }

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
  async resendOtp(phone) {
    const otpCode = this.generateOtp();
    const allOtpRecords = await Otp.find({ phone });
    if (allOtpRecords.length > 0) {
      await Otp.deleteMany({ phone });
    }
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

  async sendMessage(phone, messageContent,senderId,receiverId) {
    const payload = {
      route: 'q',
      message: messageContent,
      language: 'english',
      flash: 0,
      numbers: phone,
      sender_id: 'TXTIND',
    };

    const headers = {
      'authorization': this.apiKey,
      'Content-Type': 'application/json',
    };

    // Send message using Fast2SMS API
    const response = await axios.post(this.baseUrl, payload, { headers });
    const messageData = new Message({
      senderId,
      receiverId,
      message: messageContent,
      sentAt: new Date.now(),
    })

    if (response.data && response.data.return !== true) {
      throw new Error('Failed to send message via Fast2SMS');
    }

    return response.data;
  }
}

export default new Fast2SmsOtpService();

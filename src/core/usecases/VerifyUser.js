import CustomError from "../../adapters/controllers/ErrorHandler.js";

export default class VerifyOtpAndLogin {
  constructor(userRepository, otpService, jwtService) {
    this.userRepository = userRepository;
    this.otpService = otpService;
    this.jwtService = jwtService;
  }

  async execute({ phone, otp }) {
    const isOtpValid = await this.otpService.verifyOtp(phone, otp);
    if (!isOtpValid) {
      throw new CustomError('Invalid or expired OTP', 400);
    }

    const user = await this.userRepository.findByPhoneNumber(phone);
    if (!user) {
      throw new CustomError('User not found', 404);
    }

    const token = this.jwtService.generateToken({ id: user.id, phone: user.phone });

    return { user, token };
  }
}

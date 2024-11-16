export default class VerifyOtpAndLogin {
  constructor(userRepository, otpService, jwtService) {
    this.userRepository = userRepository;
    this.otpService = otpService;
    this.jwtService = jwtService;
  }

  async execute({ phone, otp }) {
    const isOtpValid = await this.otpService.verifyOtp(phone, otp);
    if (!isOtpValid) {
      throw new Error('Invalid or expired OTP');
    }

    const user = await this.userRepository.findByPhoneNumber(phone);
    if (!user) {
      throw new Error('User not found');
    }

    const token = this.jwtService.generateToken({ id: user.id, phone: user.phone });

    return { user, token };
  }
}

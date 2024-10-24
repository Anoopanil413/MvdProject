export default class VerifyOtpAndLogin {
  constructor(userRepository, otpService, jwtService) {
    this.userRepository = userRepository;
    this.otpService = otpService;
    this.jwtService = jwtService;
  }

  async execute({ phoneNumber, otp }) {
    const isOtpValid = await this.otpService.verifyOtp(phoneNumber, otp);
    if (!isOtpValid) {
      throw new Error('Invalid or expired OTP');
    }

    const user = await this.userRepository.findByPhoneNumber(phoneNumber);
    if (!user) {
      throw new Error('User not found');
    }

    const token = this.jwtService.generateToken({ id: user.id, phoneNumber: user.phoneNumber });

    return { user, token };
  }
}

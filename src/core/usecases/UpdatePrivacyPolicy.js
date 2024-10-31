
export default class UpdatePrivacyPolicy {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute(userPolicyData) {
    const { userId,isNameVisible,isPhoneVisible } = userPolicyData;
    const user = await this.userRepository.findById(userId);

    if(!user)throw new Error('User not found');
    user.isPhoneVisible = isPhoneVisible;
    user.isNameVisible = isNameVisible;


    await this.userRepository.update(user);
  }
}
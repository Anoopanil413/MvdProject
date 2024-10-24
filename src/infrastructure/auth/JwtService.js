import jwt from 'jsonwebtoken';

class JwtService {
  static generateToken(user) {
    return jwt.sign({ id: user.id, phone: user.phone }, process.env.JWT_SECRET, { expiresIn: '1h' });
  }

  static verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
  }
}

export default new JwtService();

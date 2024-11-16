
  class AuthenticationController {
    constructor(jwtService) {
      this.jwtService = jwtService;
    }

    authenticate = (req, res, next) => {
      try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = this.jwtService.verifyToken(token);
        req.user = decoded;
        next();
      } catch (error) {
        res.status(401).json({ error: 'Unauthorized' });
      }
    };
  }

  export default AuthenticationController;
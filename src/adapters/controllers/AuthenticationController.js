class AuthenticationController {
  constructor(jwtService) {
    this.jwtService = jwtService;
  }

  authenticate = (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = this.jwtService.verifyToken(token);

      // Attach decoded user info to request
      req.user = decoded;
      req.userId = decoded.id;
      next();
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        try {
          const oldToken = req.headers.authorization.split(' ')[1];
          const decoded = jwt.decode(oldToken); 
          
          if (decoded && decoded.id && decoded.phone) {
            const newToken = this.jwtService.generateToken(decoded);
            res.setHeader('Authorization', `Bearer ${newToken}`);
            req.user = decoded; 
            req.userId = decoded.id;

            next(); 
          } else {
            throw new Error('Invalid token payload');
          }
        } catch (innerError) {
          res.status(401).json({ error: 'Unauthorized - Token expired and cannot be renewed' });
        }
      } else {
        res.status(401).json({ error: 'Unauthorized' });
      }
    }
  };
}

export default AuthenticationController;

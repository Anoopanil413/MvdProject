const authenticate = (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = JwtService.verifyToken(token); 
      req.user = decoded; 
      next();
    } catch (error) {
      res.status(401).json({ error: 'Unauthorized' });
    }
  };
  
  export default authenticate;
  
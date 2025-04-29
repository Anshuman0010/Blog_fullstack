const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  let token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  // Remove 'Bearer ' prefix from the token
  token = token.replace('Bearer ', '');
  console.log('Received token:', token);
  
  try {
    const decoded = jwt.verify(token, "1234");
    console.log('Decoded token:', decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.error('JWT verification failed:', err);
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = { authenticate };

const jwt = require('jsonwebtoken');
const config = require('../config/env.config');
const { sendError } = require('../helpers/response.helper');

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return sendError(res, 'Unauthorized - No token provided', 401);
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded;
    next();
  } catch (error) {
    sendError(res, 'Unauthorized - Invalid token', 401);
  }
};

module.exports = authMiddleware;

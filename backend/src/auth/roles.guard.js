const { sendError } = require('../helpers/response.helper');

const rolesGuard = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return sendError(res, 'Forbidden - User role not found', 403);
    }

    if (!allowedRoles.includes(req.user.role)) {
      return sendError(res, 'Forbidden - Insufficient permissions', 403);
    }

    next();
  };
};

module.exports = rolesGuard;

const rolesGuard = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(403).json({ success: false, message: 'Forbidden - User role not found' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: 'Forbidden - Insufficient permissions' });
    }

    next();
  };
};

module.exports = rolesGuard;

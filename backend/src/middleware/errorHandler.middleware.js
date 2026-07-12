const { sendError } = require('../helpers/response.helper');
const config = require('../config/env.config');

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  const message = err.message || 'Internal Server Error';
  
  sendError(res, message, statusCode, config.environment === 'development' ? err.stack : null);
};

module.exports = errorHandler;

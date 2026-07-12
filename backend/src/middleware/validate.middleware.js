const { sendError } = require('../helpers/response.helper');

const validate = (schema) => (req, res, next) => {
  try {
    if (schema && schema.parse) {
      req.body = schema.parse(req.body);
    }
    next();
  } catch (error) {
    sendError(res, 'Validation Error', 400, error.errors || error);
  }
};

module.exports = validate;

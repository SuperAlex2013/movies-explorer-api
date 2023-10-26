const { UNAUTHORIZED } = require('./statusCode');

class UnauthorizedError extends Error {
  constructor(msg) {
    super(msg);
    this.statusCode = UNAUTHORIZED;
  }
}

module.exports = UnauthorizedError;

const { isCelebrateError } = require('celebrate');

const celebrateErr = (err, req, res, next) => {
  if (isCelebrateError(err)) {
    // 'err' is an instance of CelebrateError
    const validationError = {};
    err.details.forEach((value, key) => {
      validationError[key] = value.msg;
    });
    return res.status(400).json(validationError);
  }
  return next(err);
};

module.exports = celebrateErr;

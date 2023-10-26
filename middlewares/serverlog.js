const { SERVER_ERROR } = require('../errors/statusCode');
const { serverError } = require('../errors/errorTexts');

const serverLog = (err, req, res, next) => {
  const { statusCode = SERVER_ERROR, message: errMsg } = err;

  res.status(statusCode).send({
    message: statusCode === SERVER_ERROR ? serverError : errMsg,
  });

  next();
};

module.exports = serverLog;

const winston = require('winston');
const expressWinston = require('express-winston');

const fileTransportOptions = (filename) => ({
  filename,
  handleExceptions: true,
  json: true,
});

const requestLogger = expressWinston.logger({
  transports: [new winston.transports.File(fileTransportOptions('request.log'))],
  format: winston.format.json(),
});

const errorLogger = expressWinston.errorLogger({
  transports: [new winston.transports.File(fileTransportOptions('error.log'))],
  format: winston.format.json(),
});

module.exports = {
  requestLogger,
  errorLogger,
};

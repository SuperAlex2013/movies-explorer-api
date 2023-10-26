// HTTP статус-коды
const OK = 200;
const CREATED = 201;
const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const FORBIDDEN = 403;
const NOT_FOUND = 404;
const CONFLICT_ERROR = 409;
const SERVER_ERROR = 500;

const handleResult = (res, data) => {
  res.status(OK).json(data);
};

module.exports = {
  BAD_REQUEST,
  UNAUTHORIZED,
  FORBIDDEN,
  NOT_FOUND,
  CONFLICT_ERROR,
  SERVER_ERROR,
  OK,
  CREATED,
  handleResult,
};

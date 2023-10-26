require('dotenv').config();

const DB_DEV = 'mongodb://localhost:27017/bitfilmsdb';
const JWT_TOKEN_EXPIRES = '7d';

module.exports = {
  JWT_TOKEN_EXPIRES,
  DB_DEV,
};

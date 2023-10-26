require('dotenv').config();

const DB_DEV = 'mongodb://127.0.0.1:27017/bitfilmsdb';
const JWT_TOKEN_EXPIRES = '7d';

module.exports = {
  JWT_TOKEN_EXPIRES,
  DB_DEV,
};

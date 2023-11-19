const { NODE_ENV, ALLOWED_CORS_PRODUCTION } = process.env;

const ALLOWED_CORS = ['https://localhost:3000', 'http://localhost:3000', 'localhost:3000', 'https://ultradiploma.nomoredomainsrocks.ru', 'http://ultradiploma.nomoredomainsrocks.ru'];

const CORS_OPTIONS = {
  credentials: true,
  origin: ALLOWED_CORS,
  exposedHeaders: ['set-cookie'],
};

module.exports = {
  CORS_OPTIONS,
};

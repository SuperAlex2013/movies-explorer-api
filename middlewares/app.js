const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const { errors } = require('celebrate');
const serverLog = require('./serverlog');
const celebrateErr = require('./celebrateErr');
const { requestLogger, errorLogger } = require('./logger');
const { CORS_OPTIONS } = require('./cors');

const setupMiddlewares = (app) => {
  // подключаем логгер запросов
  app.use(requestLogger);

  // CORS
  app.use(cors(CORS_OPTIONS));
  app.use(helmet());

  // чтение тело запросов
  app.use(express.json());
};

const setupErrorHandlers = (app) => {
  // Обработчик ошибок валидации Celebrate
  app.use(celebrateErr);

  // Логгирование ошибок
  app.use(errorLogger);
  app.use(errors());
  app.use(serverLog);
};

module.exports = { setupMiddlewares, setupErrorHandlers };

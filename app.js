require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { setupMiddlewares, setupErrorHandlers } = require('./middlewares/app');
const router = require('./routes');
const { DB_DEV } = require('./util/constants');

const app = express();

setupMiddlewares(app);

// Добавление данных / роутинги
app.use(router);

setupErrorHandlers(app);
// ----------------------------------- Настройки сервера и БД --------------------------------/
const { NODE_ENV, DB, PORT = 3000 } = process.env;

mongoose.connect(NODE_ENV === 'production' ? DB : DB_DEV, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});

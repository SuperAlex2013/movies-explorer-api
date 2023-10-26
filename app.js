require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { setupMiddlewares, setupErrorHandlers } = require('./middlewares/app');
const router = require('./routes');
const { DB_DEV } = require('./util/constants');

const app = express();

setupMiddlewares(app);

app.use(router);

setupErrorHandlers(app);

const { PORT = 3000, NODE_ENV, DB_PROD } = process.env;

const dbConnectionString = NODE_ENV === 'production' ? DB_PROD : DB_DEV;

mongoose.connect(dbConnectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((err) => {
    console.error('Database connection error', err);
    process.exit(1);
  });

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});

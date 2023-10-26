const express = require('express');

const router = express.Router();

// Importing middlewares
const authMiddleware = require('../middlewares/auth');
const validationMiddleware = require('../middlewares/validation');

// Importing controllers
const authController = require('../controllers/auth');

// Importing routes
const userRoutes = require('./usersRoutes');
const movieRoutes = require('./moviesRoutes');

// Importing custom error handlers
const NotFoundError = require('../errors/NotFoundError');
const errorTexts = require('../errors/errorTexts');

router.post('/signup', validationMiddleware.validationCreateUser, authController.createUser);

router.post('/signin', validationMiddleware.validationLogin, authController.login);

// Apply authentication middleware to all routes following this line
router.use(authMiddleware);

router.use('/users', userRoutes);
router.use('/movies', movieRoutes);

// Catch-all route for undefined routes, returns a 404 error
router.use('/*', (req, res, next) => {
  next(new NotFoundError(errorTexts.pageNotFound));
});

// Exporting the router to be used in other parts of the application
module.exports = router;

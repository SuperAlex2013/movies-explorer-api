const express = require('express');

const router = express.Router();

const { validationUpdateUser } = require('../middlewares/validation');
const { getCurrentUser, updateUser } = require('../controllers/usersController');

// Retrieve user information
router.get('/me', getCurrentUser);

// Update user information (email and name)
router.patch('/me', validationUpdateUser, updateUser);

module.exports = router;

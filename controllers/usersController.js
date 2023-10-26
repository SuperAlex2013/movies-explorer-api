// Importing required modules and error classes
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const { OK, handleResult } = require('../errors/statusCode');
const {
  userIdNotFound,
  duplicateEmailError,
  invalidDataError,
} = require('../errors/errorTexts');

// Controller for getting the current user
async function getCurrentUser(req, res, next) {
  try {
    const user = await User.findById(req.user._id, { __v: 0 });
    handleResult(res, user);
  } catch (error) {
    next(error);
  }
}

// Controller for updating user information
async function updateUser(req, res, next) {
  try {
    const { name, email } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { name, email },
      { new: true, runValidators: true },
    );

    if (!updatedUser) {
      throw new NotFoundError(userIdNotFound);
    }

    res.status(OK).json(updatedUser);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return next(new BadRequestError(invalidDataError));
    }

    if (error.code === 11000) {
      return next(new ConflictError(duplicateEmailError));
    }

    return next(error);
  }
  return 0;
}

// Exporting controller functions
module.exports = {
  getCurrentUser,
  updateUser,
};

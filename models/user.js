const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { isEmail } = require('validator');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { wrongCredentialsError } = require('../errors/errorTexts');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [2, 'Name must be at least 2 characters long'],
    maxlength: [30, 'Name must be at most 30 characters long'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    validate: [isEmail, 'Invalid email address'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    select: false,
  },
}, { versionKey: false });

userSchema.statics.findUserByCredentials = async function findUser(email, password) {
  const user = await this.findOne({ email }).select('+password');
  if (!user) {
    throw new UnauthorizedError(wrongCredentialsError);
  }

  const matched = await bcrypt.compare(password, user.password);
  if (!matched) {
    throw new UnauthorizedError(wrongCredentialsError);
  }

  return user;
};

const User = mongoose.model('user', userSchema);
module.exports = User;

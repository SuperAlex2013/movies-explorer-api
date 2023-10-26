const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const { CREATED } = require('../errors/statusCode');
const { JWT_TOKEN_EXPIRES } = require('../util/constants');

const {
  NODE_ENV, JWT_SECRET,
} = process.env;

const hashPassword = (password) => bcrypt.hashSync(password, 7);

const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = hashPassword(password);
    const newUser = new User({ name, email, password: hashedPassword });
    const result = await newUser.save();
    res.status(CREATED).send({ email: result.email, name: result.name });
    return null;
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError('Invalid data'));
    } else if (err.code === 11000) {
      next(new ConflictError('Email is already in use'));
    } else {
      next(err);
    }
    return null;
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findUserByCredentials(email, password);
    const token = jwt.sign({ _id: user._id.toString() }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: JWT_TOKEN_EXPIRES });
    res.send({ token });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createUser,
  login,
};

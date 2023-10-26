const { Joi, celebrate } = require('celebrate');
const {
  userSchema, movieSchema, updateUserSchema, loginSchema,
} = require('./validationSchemas');

exports.validationCreateUser = celebrate({
  body: userSchema,
});

exports.validationLogin = celebrate({
  body: loginSchema,
});

exports.validationUpdateUser = celebrate({
  body: updateUserSchema,
});

exports.validationCreateMovie = celebrate({
  body: movieSchema,
});

exports.validationMovieById = celebrate({
  params: {
    movieId: Joi.string().length(24).hex().required(),
  },
});

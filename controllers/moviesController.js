const Movie = require('../models/movie');
const { CREATED } = require('../errors/statusCode');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const {
  invalidDataError, movieIdNotFoundError, movieDeletedSuccess, forbiddenError,
} = require('../errors/errorTexts');

const handleResult = (res, result, statusCode = 200) => {
  res.status(statusCode).json(result);
};

// Получить данные о всех фильмах
const getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({ owner: req.user._id }).populate(['owner']);
    handleResult(res, movies);
  } catch (err) {
    next(err);
  }
};

// Создаёт карточку
const createMovie = async (req, res, next) => {
  try {
    const newMovieData = { ...req.body, owner: req.user._id };
    const movie = await new Movie(newMovieData).save();
    handleResult(res, movie, CREATED);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new BadRequestError(invalidDataError));
    }
    return next(err);
  }
  return 0;
};

// Удаление фильма
const deleteMovie = async (req, res, next) => {
  try {
    const { movieId } = req.params;
    const movie = await Movie.findById(movieId);

    if (!movie) {
      throw new NotFoundError(movieIdNotFoundError);
    }
    if (!movie.owner || movie.owner.toString() !== req.user._id) {
      throw new ForbiddenError(forbiddenError);
    }

    await Movie.findByIdAndRemove(movieId);
    res.send({ msg: movieDeletedSuccess });
  } catch (err) {
    if (err.name === 'CastError' || err.name === 'ValidationError') {
      return next(new BadRequestError(invalidDataError));
    }
    return next(err);
  }
  return 0;
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};

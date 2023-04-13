const movieSchema = require('../models/movie');
const BadRequestErr = require('../errors/BadRequestErr');
const NotFoundErr = require('../errors/NotFoundErr');
const ForbiddenErr = require('../errors/ForbiddenErr');

const {
  BAD_REQUEST_MOVIES_ERROR,
  BAD_REQUEST_MOVIES_DELETE_ERROR,
  NOT_FOUND_MOVIE_ERROR,
  FORBIDDEN_MOVIE_ERROR,
  MOVIE_DELETED,
} = require('../utils/constants');

const getMovies = (req, res, next) => {
  movieSchema
    .find({ owner: req.user._id })
    .populate(['owner'])
    .then((movies) => res.send(movies))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameEN,
    nameRU,
  } = req.body;
  const owner = req.user._id;

  movieSchema
    .create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      movieId,
      nameEN,
      nameRU,
      owner,
    })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestErr(BAD_REQUEST_MOVIES_ERROR));
      } else {
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => {
  movieSchema
    .findById(req.params.movieId)
    .orFail(() => {
      throw new NotFoundErr(NOT_FOUND_MOVIE_ERROR);
    })
    .then((movie) => {
      const owner = movie.owner.toString();
      if (req.user._id === owner) {
        movieSchema.deleteOne(movie)
          .then(() => { res.send(MOVIE_DELETED); })
          .catch(next);
      } else {
        throw new ForbiddenErr(FORBIDDEN_MOVIE_ERROR);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestErr(BAD_REQUEST_MOVIES_DELETE_ERROR));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};

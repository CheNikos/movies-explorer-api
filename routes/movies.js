const router = require('express').Router();

const { celebrate, Joi } = require('celebrate');
const { URL_CHECK } = require('../utils/constants');

const {
  createMovie,
  getMovies,
  deleteMovie,
} = require('../controllers/movies');

router.get('/movies', getMovies);

router.post('/movies', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(URL_CHECK),
    trailer: Joi.string().required().pattern(URL_CHECK),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().pattern(URL_CHECK),
    movieId: Joi.required(),
  }),
}), createMovie);

router.delete('/movies/_id', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
}), deleteMovie);

module.exports = router;

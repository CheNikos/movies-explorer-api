const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const routeUsers = require('./users');
const routeMovies = require('./movies');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const NotFoundErr = require('../errors/NotFoundErr');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

router.use(auth);

router.use('/', routeUsers);
router.use('/', routeMovies);

router.use((req, res, next) => {
  next(new NotFoundErr('Такой страницы не существует'));
});

module.exports = router;

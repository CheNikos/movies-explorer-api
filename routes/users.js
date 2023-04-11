const router = require('express').Router();

const { celebrate, Joi } = require('celebrate');

const {
  setUserInfo,
  getCurrentUser,
} = require('../controllers/users');

router.get('/users/me', getCurrentUser);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    email: Joi.string().min(2).max(30).required(),
    name: Joi.string().min(2).max(30).required(),
  }),
}), setUserInfo);

module.exports = router;

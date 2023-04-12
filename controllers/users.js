const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const userSchema = require('../models/user');

const BadRequestErr = require('../errors/BadRequestErr');
const UnauthorizedErr = require('../errors/UnauthorizedErr');
const NotFoundErr = require('../errors/NotFoundErr');
const ConflictErr = require('../errors/ConflictErr');

const { NODE_ENV, JWT_SECRET } = process.env;

const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => userSchema.create({
      name, email, password: hash,
    }))
    .then(() => res.status(201).send({
      name,
      email,
    }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictErr('Пользователь с таким email уже зарегистрирован'));
      } else if (err.name === 'ValidationError') {
        next(new BadRequestErr('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const {
    email, password,
  } = req.body;

  userSchema
    .findOne({ email }).select('+password')
    .orFail(() => new UnauthorizedErr('Неправильные почта или пароль'))
    .then((user) => bcrypt.compare(password, user.password).then((matched) => {
      if (matched) {
        return user;
      }
      throw new UnauthorizedErr('Пользователь не найден');
    }))
    .then((user) => {
      const jwt = jsonwebtoken.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
      res.send({ jwt });
    })
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  userSchema.findById(req.user._id)
    .then((user) => {
      if (user) return res.status(200).send(user);

      throw new NotFoundErr('Пользователь с таким id не найден');
    })
    .catch(next);
};

const setUserInfo = (req, res, next) => {
  const { name, email } = req.body;
  const { _id: userId } = req.user;

  userSchema
    .findByIdAndUpdate(
      userId,
      {
        name,
        email,
      },
      {
        new: true,
        runValidators: true,
      },
    )
    .then((user) => {
      if (user) return res.send(user);

      throw new NotFoundErr('Пользователь с таким id не найден');
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestErr('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  createUser,
  setUserInfo,
  login,
  getCurrentUser,
};

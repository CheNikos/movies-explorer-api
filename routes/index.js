const express = require('express');
const router = require('express').Router();
const routeUsers = require('./users');
const routeMovies = require('./movies');
const NotFoundErr = require('../errors/NotFoundErr');

router.use('/', routeUsers);
router.use('/', routeMovies);

router.use((req, res, next) => {
  next(new NotFoundErr('Такой страницы не существует'));
});
router.use(express.json());

module.exports = router;

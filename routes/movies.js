const router = require('express').Router();
const { validationCreateMovie, validationMovieId } = require('../middlewares/validation');
const { createMovie, getMovies, deleteMovie } = require('../controllers/movies');

router.get('/movies', getMovies);
router.post('/movies', validationCreateMovie, createMovie);
router.delete('/movies/:movieId', validationMovieId, deleteMovie);

module.exports = router;

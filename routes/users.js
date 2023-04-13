const router = require('express').Router();
const { validationSetUserInfo } = require('../middlewares/validation');
const { setUserInfo, getCurrentUser } = require('../controllers/users');

router.get('/users/me', getCurrentUser);
router.patch('/users/me', validationSetUserInfo, setUserInfo);

module.exports = router;

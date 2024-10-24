const router = require('express').Router();
const { login, signup, logout } = require('../controllers/auth-controller');

router.post('/login', login);
router.get('/logout', logout);
router.post('/signup', signup);

module.exports = router;

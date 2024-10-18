const router = require('express').Router();
const {
  getUserProfile,
  getLoginPage
} = require('../controllers/view-controller');

router.get('/login', getLoginPage);
router.get('/profile', getUserProfile);

module.exports = router;

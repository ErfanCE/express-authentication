const router = require('express').Router();
const {
  renderLoginPage,
  renderSignupPage,
  renderUserAccountPage
} = require('../controllers/view-controller');

router.get('/login', renderLoginPage);
router.get('/signup', renderSignupPage);
router.get('/account', renderUserAccountPage);

module.exports = router;

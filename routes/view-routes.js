const router = require('express').Router();
const {
  renderLoginPage,
  renderSignupPage,
  renderAdminPanelPage,
  renderUserAccountPage
} = require('../controllers/view-controller');

router.get('/login', renderLoginPage);
router.get('/signup', renderSignupPage);
router.get('/account', renderUserAccountPage);
router.get('/admin-panel', renderAdminPanelPage);

module.exports = router;

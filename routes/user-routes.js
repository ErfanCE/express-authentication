const router = require('express').Router();
const {
  getAllUsers,
  getUserByUsername,
  editUserByUsername,
  removeUserByUsername
} = require('../controllers/user-controller');

router.get('/', getAllUsers);
router.get('/:username', getUserByUsername);
router.patch('/:username', editUserByUsername);
router.delete('/:username', removeUserByUsername);

module.exports = router;

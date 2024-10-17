const { join } = require('node:path');
const router = require('express').Router();

router.get('/', (request, response) => {
  response.status(200).render(join(__dirname, '../views/index.ejs'));
});

module.exports = router;

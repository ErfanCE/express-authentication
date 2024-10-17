const router = require('express').Router();

router.get('/', (request, response) =>
  response.status(200).send('root Route for /api')
);

module.exports = router;

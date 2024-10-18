const { join } = require('node:path');
const users = require('../dbs/users/users.json');

const getUserProfile = (request, response, next) => {
  const user = users.find((user) => user.isLoggedIn);
  if (!user) {
    return response.redirect('http://localhost:8000/login');
  }

  response.render(join(__dirname, '../views/index.ejs'), {
    username: user.username,
    email: user.email,
    gender: user.gender
  });
};

const getLoginPage = (request, response, next) => {
  response.render(join(__dirname, '../views/login.ejs'));
};

module.exports = { getUserProfile, getLoginPage };

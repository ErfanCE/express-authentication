const { join } = require('node:path');
const users = require('../dbs/users/users.json');

const renderLoginPage = (request, response, next) => {
  response.status(200).render(join(__dirname, '../views/login.ejs'));
};
const renderSignupPage = (request, response, next) => {
  response.status(200).render(join(__dirname, '../views/signup.ejs'));
};

const renderUserAccountPage = (request, response, next) => {
  const user = users.find((user) => user.isLoggedIn);
  if (!user) {
    return response.redirect('http://localhost:8000/login');
  }

  response
    .status(200)
    .render(join(__dirname, '../views/user-account.ejs'), { user });
};

module.exports = { renderLoginPage, renderSignupPage, renderUserAccountPage };

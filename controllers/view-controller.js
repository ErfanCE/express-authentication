const { join } = require('node:path');
const users = require('../dbs/users/users.json');

const isLoggedIn = !!users.find((user) => user.isLoggedIn);

const renderLoginPage = (request, response, next) => {
  response
    .status(200)
    .render(join(__dirname, '../views/login.ejs'), { isLoggedIn });
};
const renderSignupPage = (request, response, next) => {
  response
    .status(200)
    .render(join(__dirname, '../views/signup.ejs'), { isLoggedIn });
};

const renderUserAccountPage = (request, response, next) => {
  const user = users.find((user) => user.isLoggedIn);
  if (!user) {
    return response.redirect('http://localhost:8000/login');
  }

  response
    .status(200)
    .render(join(__dirname, '../views/user-account.ejs'), { user, isLoggedIn });
};

const renderAdminPanelPage = (request, response, next) => {
  response
    .status(200)
    .render(join(__dirname, '../views/admin-panel.ejs'), { users, isLoggedIn });
};

module.exports = {
  renderLoginPage,
  renderSignupPage,
  renderAdminPanelPage,
  renderUserAccountPage
};

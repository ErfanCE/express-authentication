const { AppError } = require('../utils/app-error');
const { writeUsersData } = require('../dbs/users/users-data-manipulation');
const users = require('../dbs/users/users.json');

const login = async (request, response, next) => {
  try {
    const { username = null, password = null } = request.body;

    if (!username?.trim() || !password?.trim()) {
      return next(new AppError(400, 'username and password are required.'));
    }

    // Login Logic
    const user = users.find((user) => user.username === username);
    if (!user) {
      return next(new AppError(401, 'USERNAME or password not match.'));
    }
    if (user.password !== password) {
      return next(new AppError(401, 'username or PASSWORD not match.'));
    }

    // update user status
    user.isLoggedIn = true;
    await writeUsersData(users);

    response.status(200).json({
      status: 'success',
      data: { username }
    });
  } catch (err) {
    next(new AppError(500, `[-] auth-controller > login: ${err?.message}`));
  }
};

const signup = async (request, response, next) => {
  try {
    const {
      username = null,
      password = null,
      email = null,
      gender = 'not-set'
    } = request.body;

    if (!username?.trim() || !password?.trim() || !email?.trim()) {
      return next(
        new AppError(400, 'username, password and email are required.')
      );
    }

    const isUsernameExists = !!users.find((user) => user.username === username);
    if (isUsernameExists) {
      return next(new AppError(409, `username: (${username}) already exists`));
    }

    users.push({
      isLoggedIn: false,
      username,
      password,
      email,
      gender
    });

    await writeUsersData(users);

    response.status(200).json({
      status: 'success',
      data: { username }
    });
  } catch (err) {
    next(new AppError(500, `[-] auth-controller > signup: ${err?.message}`));
  }
};

module.exports = { login, signup };

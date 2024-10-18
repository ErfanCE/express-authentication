const { AppError } = require('../utils/app-error');
const { writeUsersData } = require('../dbs/users/users-data-manipulation');
const users = require('../dbs/users/users.json');

const getAllUsers = (_request, response, _next) => {
  const normalizedUsers = users.map(({ username, email, gender }) => {
    return { username, email, gender };
  });

  response.status(200).json({
    status: 'success',
    data: { users: normalizedUsers },
    total: normalizedUsers.length
  });
};

const getUserByUsername = (request, response, next) => {
  const { method, originalUrl } = request;
  const { username } = request.params;

  if (!username.trim()) {
    return next(new AppError(404, `${method} ${originalUrl} not found`));
  }
  const user = users.find((user) => user.username === username);
  if (!user) {
    return next(new AppError(404, `${method} ${originalUrl} not found`));
  }

  response.status(200).json({
    status: 'success',
    data: {
      user: { username: user.username, email: user.email, gender: user.gender }
    }
  });
};

const editUserByUsername = async (request, response, next) => {
  try {
    const { method, originalUrl } = request;
    const { username } = request.params;
    const {
      username: modifiedUsername = null,
      password = null,
      email = null,
      gender = null
    } = request.body;

    if (!username.trim()) {
      return next(new AppError(404, `${method} ${originalUrl} not found`));
    }
    const user = users.find((user) => user.username === username);
    if (!user) {
      return next(new AppError(404, `${method} ${originalUrl} not found`));
    }

    if (modifiedUsername?.trim()) {
      const isUsersnameExists = !!users.find(
        (user) => user.username === modifiedUsername
      );
      if (isUsersnameExists) {
        return next(
          new AppError(409, `username: (${username}) already exists`)
        );
      }

      user.username = modifiedUsername;
    }
    user.password = password ?? user.password;
    user.email = email ?? user.email;
    user.gender = gender ?? user.gender;

    await writeUsersData(users);

    response.status(200).json({
      status: 'success',
      data: { username }
    });
  } catch (err) {
    next(
      new AppError(
        500,
        `[-] user-controller > editUserByUsername: ${err?.message}`
      )
    );
  }
};

const removeUserByUsername = async (request, response, next) => {
  try {
    const { method, originalUrl } = request;
    const { username } = request.params;

    if (!username.trim()) {
      return next(new AppError(404, `${method} ${originalUrl} not found`));
    }
    const targetUserIndex = users.findIndex(
      (user) => user.username === username
    );
    if (targetUserIndex === -1) {
      return next(new AppError(404, `${method} ${originalUrl} not found`));
    }

    users.splice(targetUserIndex, 1);
    await writeUsersData(users);

    response.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    next(
      new AppError(
        500,
        `[-] user-controller > removeUserByUsername: ${err?.message}`
      )
    );
  }
};

module.exports = {
  getAllUsers,
  getUserByUsername,
  editUserByUsername,
  removeUserByUsername
};

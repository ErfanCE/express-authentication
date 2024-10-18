const {
  access,
  writeFile,
  constants: { F_OK }
} = require('node:fs/promises');
const { join } = require('node:path');

const usersPathname = join(__dirname, './users.json');

const writeUsersData = async (users) => {
  try {
    const usersAsJson = JSON.stringify(users);

    await access(usersPathname, F_OK);
    await writeFile(usersPathname, usersAsJson);

    console.info('[i] users data written successfully.');
  } catch (err) {
    throw err;
  }
};

module.exports = {
  writeUsersData
};

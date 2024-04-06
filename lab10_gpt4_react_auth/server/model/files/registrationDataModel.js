const { readFileSync, writeFileSync } = require("fs");
const { join } = require("path");
const bcrypt = require("bcrypt");

const filePath = join(__dirname, "..", "..", "db", "files", "users.json");

const registrationDataModel = (newUser) => {
  try {
    const users = readFileSync(filePath, "utf-8");
    const usersCopy = JSON.parse(users);

    const existingUser = usersCopy.find((u) => u.username === newUser.username);

    if (existingUser)
      throw new Error(
        `Пользователь с логином ${existingUser.username} уже существует`
      );

    const hashedPassword = bcrypt.hashSync(newUser.password, 10);
    const hashedUser = { ...newUser, password: hashedPassword };

    const newUsers = [...usersCopy, hashedUser];

    writeFileSync(filePath, JSON.stringify(newUsers));
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

module.exports = registrationDataModel;

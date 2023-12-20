const { readFileSync, writeFileSync } = require("fs");
const { join } = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const filePath = join(__dirname, "..", "..", "db", "files", "users.json");

const authDataModel = (authUser) => {
  try {
    const users = readFileSync(filePath, "utf-8");
    const usersCopy = JSON.parse(users);

    const existingUser = usersCopy.find(
      (u) => u.username === authUser.username
    );

    if (!existingUser) throw new Error("Авторизационные данные неверны");

    const isPasswordValid = bcrypt.compareSync(
      authUser.password,
      existingUser.password
    );

    if (!isPasswordValid) throw new Error("Авторизационные данные неверны");

    const refreshToken = jwt.sign(
      { username: existingUser.username },
      process.env.JWT_REFRESH_TOKEN,
      { expiresIn: "30d" }
    );

    const accessToken = jwt.sign(
      { username: existingUser.username },
      process.env.JWT_ACCESS_TOKEN,
      { expiresIn: "30s" }
    );

    // существующему пользователю записываем токены
    existingUser.tokens = {
      accessToken,
      refreshToken,
    };

    const otherUsers = usersCopy.filter(
      (u) => u.username !== authUser.username
    );

    const newUsers = [...otherUsers, existingUser];

    writeFileSync(filePath, JSON.stringify(newUsers));

    return {
      username: existingUser.username,
      accessToken,
      refreshToken,
    };
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

module.exports = authDataModel;

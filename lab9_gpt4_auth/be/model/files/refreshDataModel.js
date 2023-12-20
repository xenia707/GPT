const { readFileSync, writeFileSync, writeFile } = require("fs");
const { join } = require("path");
const jwt = require("jsonwebtoken");

const filePath = join(__dirname, "..", "..", "db", "files", "users.json");

const refreshDataModel = (refreshToken) => {
  try {
    const users = readFileSync(filePath, "utf-8");
    const usersCopy = JSON.parse(users);
    const existingUser = usersCopy.find(
      (u) => u.tokens.refreshToken === refreshToken
    );

    if (!existingUser) throw new Error("Пользователь не авторизован");

    const otherUsers = usersCopy.filter(
      (u) => u.tokens.refreshToken !== refreshToken
    );

    const accessToken = jwt.sign(
      { username: existingUser.username },
      process.env.JWT_ACCESS_TOKEN,
      { expiresIn: "30s" }
    );

    existingUser.tokens.accessToken = accessToken;

    const newUsers = [...otherUsers, existingUser];

    writeFileSync(filePath, JSON.stringify(newUsers));

    return accessToken;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

module.exports = refreshDataModel;

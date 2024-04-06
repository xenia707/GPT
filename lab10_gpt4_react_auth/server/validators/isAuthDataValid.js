const { isObjectHasProps } = require("./utils/validators");

const isAuthDataValid = (data) => {
  isObjectHasProps(data, ["username", "password"]);

  if (data.username.length < 3) {
    throw new Error(
      `Логин слишком короткий. Должен быть мирниму 3 символа, сейчас - ${data.username.length}`
    );
  }

  if (data.password.length < 8) {
    throw new Error(
      `Логин слишком короткий. Должен быть мирниму 8 символа, сейчас - ${data.password.length}`
    );
  }
};

module.exports = isAuthDataValid;

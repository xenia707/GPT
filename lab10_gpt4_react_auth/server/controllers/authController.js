const registrationDataModel = require("../model/files/registrationDataModel");
const authDataModel = require("../model/files/authDataModel");
const refreshDataModel = require("../model/files/refreshDataModel");

const isAuthDataValid = require("../validators/isAuthDataValid");

const registrationController = (req, res, next) => {
  if (!req)
    return res.status(400).json({
      message: "Необходимо указать логин и пароль для регистрации",
    });

  try {
    const user = req.body;
    isAuthDataValid(user);

    // если с данными все ок, тогда пишем в файл через модель файлов
    registrationDataModel(user);

    res.status(200).json({
      message: "Пользователь создан",
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const authController = (req, res, next) => {
  if (!req)
    return res.status(400).json({
      message: "Необходимо указать логин и пароль для авторизации",
    });

  try {
    const user = req.body;
    isAuthDataValid(user);

    // если с данными все ок, передаем данные в модель
    const authUser = authDataModel(user);

    res.cookie("jwt", authUser.refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 * 30,
    });

    res.status(200).json({
      message: "Пользователь авторизован",
      accessToken: authUser.accessToken,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const refreshController = (req, res, next) => {
  if (!req)
    return res.status(400).json({
      message: "Необходим resfreshToken для обновления",
    });

  if (!req.cookies)
    return res.status(400).json({
      message: "Необходим resfreshToken для обновления",
    });

  const refreshToken = req.cookies["jwt"];

  console.log("refreshToken:");
  console.log(refreshToken);

  const accessToken = refreshDataModel(refreshToken);

  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 * 30,
  });

  res.status(200).json({
    accessToken,
  });
};

module.exports = {
  registrationController,
  authController,
  refrehController: refreshController,
};

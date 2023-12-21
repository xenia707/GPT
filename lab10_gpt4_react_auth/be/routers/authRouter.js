const express = require("express");
const authRouter = express.Router();

// Auth роутер
const {
  registrationController,
  authController,
  refrehController,
} = require("../controllers/authController");

authRouter.route("/registration").post(registrationController);
authRouter.route("/auth").post(authController);
authRouter.route("/refresh").get(refrehController);

module.exports = authRouter;

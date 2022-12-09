const express = require("express");
const authChecker = require("../middlewares/AuthChecker");
const loginAccoutLimiter = require("../middlewares/RateLimit");
const {
  RegisterUser,
  verifyEmail,
  LoginUser,
  LogoutUser,
  IsAuthUser,
} = require("../controllers/UserController");

const AuthRouter = express.Router();

AuthRouter.route("/register").post(RegisterUser);
AuthRouter.route("/users/:id/verify/:token").get(verifyEmail);
AuthRouter.route("/login").post(loginAccoutLimiter,LoginUser);
AuthRouter.route("/logout").delete(authChecker, LogoutUser);
AuthRouter.route("/authchecker").get(authChecker, IsAuthUser);

module.exports = AuthRouter;

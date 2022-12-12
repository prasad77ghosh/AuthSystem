const express = require("express");
const authChecker = require("../middlewares/AuthChecker");
const {loginAccoutLimiter, registerRateLimiter} = require("../middlewares/RateLimit");
const {
  RegisterUser,
  verifyEmail,
  LoginUser,
  LogoutUser,
  IsAuthUser,
  forgotPassword,
  resetPassword,
} = require("../controllers/UserController");

const AuthRouter = express.Router();

AuthRouter.route("/register").post(registerRateLimiter,RegisterUser);
AuthRouter.route("/password/forgot").post(registerRateLimiter,forgotPassword);
AuthRouter.route("/user/password/reset/:token").put(resetPassword);
AuthRouter.route("/users/:id/verify/:token").get(verifyEmail);
AuthRouter.route("/login").post(loginAccoutLimiter, LoginUser);
AuthRouter.route("/logout").delete(authChecker, LogoutUser);
AuthRouter.route("/authchecker").get(authChecker, IsAuthUser);

module.exports = AuthRouter;

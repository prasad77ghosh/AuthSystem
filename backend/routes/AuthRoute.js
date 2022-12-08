import express from "express";
import { RegisterUser, verifyEmail, LoginUser, LogoutUser } from "../controllers/UserController.js";

const AuthRouter = express.Router();

AuthRouter.route("/register").post(RegisterUser);
AuthRouter.route("/:id/verify/:token").get(verifyEmail);
AuthRouter.route("/login").post(LoginUser);
AuthRouter.route("/logout").post(LogoutUser);

export default AuthRouter;

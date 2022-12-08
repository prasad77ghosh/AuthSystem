import express from "express";
import { RegisterUser, verifyEmail } from "../controllers/UserController.js";

const AuthRouter = express.Router();

AuthRouter.route("/register").post(RegisterUser);
AuthRouter.route("/:id/verify/:token").get(verifyEmail);

export default AuthRouter;

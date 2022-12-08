import { User } from "../models/User.js";
import { Token } from "../models/token.js";
import ErrorHandler from "../services/ErrorHandler.js";
import { catchAsyncError } from "../middlewares/CatchAsyncError.js";
import { registerBodyValidation } from "../services/JoiValidation.js";
import bcrypt from "bcrypt";
import crypto from "crypto";

const RegisterUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;

  if (!name || !email || !password || !confirmPassword) {
    return next(new ErrorHandler("All fields are required..", 400));
  }
  if (password !== confirmPassword) {
    return next(
      new ErrorHandler("Password and confirmPassword should match", 500)
    );
  }

  const { error } = registerBodyValidation({ name, email, password });
  if (error) {
    return next(new ErrorHandler(error.details[0].message, 400));
  }

  let user = await User.findOne({ email });
  if (user) {
    return next(new ErrorHandler("User already exists..", 400));
  }

  // passwor hashing
  const salt = await bcrypt.genSalt(Number(process.env.SALT));
  const hashPassword = await bcrypt.hash(password, salt);

  user = await new User({
    name: name,
    email: email,
    password: hashPassword,
  }).save();

  const token = await new Token({
    userId: user._id,
    token: crypto.randomBytes(32).toString("hex"),
  }).save();

  
});

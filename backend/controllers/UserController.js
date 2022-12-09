const User = require("../models/User");
const Token = require("../models/Token");
const ErrorHandler = require("../services/ErrorHandler");
const sendEmail = require("../services/SendMail");
const catchAsyncError = require("../middlewares/CatchAsyncError");
const { registerBodyValidation } = require("../services/JoiValidation");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { loginBodyValidation } = require("../services/JoiValidation");

exports.RegisterUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;

  if (!name || !email || !password || !confirmPassword) {
    return next(new ErrorHandler("All fields are required..", 400));
  }
  if (password !== confirmPassword) {
    return next(
      new ErrorHandler("Password and confirmPassword should match", 500)
    );
  }

  // req body validation
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

  // create user
  user = await new User({
    name: name,
    email: email,
    password: hashPassword,
  }).save();

  // creater token
  const token = await new Token({
    userId: user._id,
    token: crypto.randomBytes(32).toString("hex"),
  }).save();

  const url = `${process.env.BASE_URL}/users/${user._id}/verify/${token.token}`;

  const text = `Click on :- \n\n ${url} \n\n to verify your Email . This Link Expire in one hour`;

  // sending verification email
  try {
    await sendEmail(user.email, "Verify Email", text);
    res.status(200).json({
      success: true,
      message: `Email send successfully to ${user.email} for verification`,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Email verification
exports.verifyEmail = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ _id: req.params.id });
  if (!user) {
    return next(new ErrorHandler("Invalid Link", 500));
  }

  const token = await Token.findOne({
    userId: user._id,
    token: req.params.token,
  });

  if (!token) {
    return next(new ErrorHandler("Invalid Link", 500));
  }

  await User.updateOne({ _id: user._id, verified: true });
  await token.remove();

  res.status(200).json({
    success: true,
    message: "Email verified successfully..",
  });
});

// login

exports.LoginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("All fields are required.."));
  }
  const { error } = loginBodyValidation({ email, password });
  if (error) {
    return next(new ErrorHandler(error.details[0].message, 400));
  }

  // find user from using request email
  const user = await User.findOne({ email });
  if (!user) {
    return next(new ErrorHandler("Invalid email and password !", 401));
  }
  // compare request password to hash password
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return next(new ErrorHandler("Invalid email and password !", 401));
  }

  // if user is not verified then check it
  if (!user.verified) {
    let token = await Token.findOne({ userId: user._id });
    if (!token) {
      token = await new Token({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();

      const url = `${process.env.BASE_URL}/users/${user._id}/verify/${token.token}`;

      const text = `Click on :- \n\n ${url} \n\n to verify your Email . This Link Expire in one hour`;

      // sending verification email
      try {
        await sendEmail(user.email, "Verify Email", text);
        res.status(200).json({
          success: true,
          message: `Email send successfully to ${user.email} for verification`,
        });
      } catch (error) {
        return next(new ErrorHandler(error.message, 500));
      }
    }
  }

  const sessUser = { id: user._id, name: user.name, email: user.email };
  req.session.user = sessUser;
  res.status(200).json({
    auth: true,
    user: sessUser,
    message: "LoggedIn Successfully..",
  });
});

exports.LogoutUser = catchAsyncError(async (req, res, next) => {
  req.session.destroy((err) => {
    //delete session data from store, using sessionID in cookie
    if (err) throw err;
    res.clearCookie(process.env.SESS_NAME); // clears cookie containing expired sessionID
    res.json({ msg: "Logged out successfully", auth: false });
  });
});

exports.IsAuthUser = catchAsyncError(async (req, res, next) => {
  const sessUser = req.session.user;
  if (sessUser) {
    res.status(200).json({
      msg: " Authenticated Successfully",
      sessUser,
      auth: true,
    });
  } else {
    return next(new ErrorHandler("You are not Logged In", 400));
  }
});

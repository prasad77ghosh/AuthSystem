const authChecker = (req, res, next) => {
  const sessUser = req.session.user;
  if (sessUser) {
    next();
  } else {
    console.log("No User Found");
    return res.status(400).json({ msg: "No User Found", auth: false });
  }
};

module.exports = authChecker;
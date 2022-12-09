const rateLimit = require("express-rate-limit");

const loginAccoutLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  statusCode: 429,
  message: {
    error:
      "Too many accounts created from this IP, please try again after a few minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = loginAccoutLimiter;

const rateLimit = require("express-rate-limit");

const loginAccoutLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3,
  statusCode: 429,
  message: {
    error:
      "Too many accounts created from this IP, please try again after 15 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const registerRateLimiter = rateLimit({
  windowMs: 2 * 60 * 1000,
  max: 2,
  statusCode: 429,
  message: {
    error:
      "Too many accounts created from this IP, please try again after  2 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { loginAccoutLimiter, registerRateLimiter };

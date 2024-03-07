const rateLimit = require("express-rate-limit");

const API_LIMITER = rateLimit({
  windowMs: 1 * 60 * 1000, // 15 minutes
  max: (req, res) => {
    console.log("Api url", req.url);

    if (req.url === "/login" || req.url === "/register") {
      return 5;
    } else {
      return 100;
    }
  },
  message: {
    success: false,
    message: "Too many request,please request after 1 minutes or login soon",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = API_LIMITER;

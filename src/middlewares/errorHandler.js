const ResponseError = require("../utils/errors");

const ErrorMiddleware = (err, req, res, next) => {
  if (err instanceof ResponseError) {
    return res
      .status(err.status)
      .json({ success: false, data: null, message: err.message });
  }
  return res.status(500).json({
    success: false,
    data: null,
    message: "Internal server error please refresh your page",
  });
};

module.exports = ErrorMiddleware;

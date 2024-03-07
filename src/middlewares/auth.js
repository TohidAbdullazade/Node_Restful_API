const jwt = require("jsonwebtoken");
const ResponseError = require("../utils/errors");
const Response = require("../utils/response");
const UserModel = require("../models/user.model");
require("dotenv").config();

// ===> GENARATE A NEW TOKEN <===
const CreateToken = async (user, res) => {
  const payload = {
    sub: user._id,
    name: user.name,
  };
  const token = await jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    algorithm: "HS512",
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });
  return new Response(token, "Login successful").Create(res);
};

// ===> VERIFY THE TOKEN <===
const TokenCheck = async (req, res, next) => {
  const headerToken =
    req.headers.authorization && req.headers.authorization.startsWith("Bearer");

  // ===> IF THE USER HAS NOT AN ACCOUNT <===
  if (!headerToken) {
    throw new ResponseError("Invalid registration, please register again", 401);
  }
  const token = req.headers.authorization.split(" ")[1];

  // ===> VERIFY THE TOKEN <===
  await jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
    if (err) {
      throw new ResponseError("Incorrect Token", 401);
    }

    const userInfo = await UserModel.findById(decoded.sub).select(
      "_id name lastname email"
    );
    // ===> IF THERE İS AN ERROR WHEN SENDING THE TOKEN <===
    if (!userInfo) {
      throw new ResponseError("Incorrect Token", 401);
    }

    req.user = userInfo;
    next();
  });
};

module.exports = { CreateToken, TokenCheck };

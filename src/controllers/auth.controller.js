const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const ResponseError = require("../utils/errors");
const Response = require("../utils/response");
const { CreateToken } = require("../middlewares/auth");

// ===> LOGIN CONTROLLER <===
const Login = async (req, res) => {
  const { email, password } = req.body;
  const userInfo = await UserModel.findOne({ email });

  // ===> CHECK OF THE EMAIL IS CORRECT <===
  if (!userInfo) {
    throw new ResponseError("There is no user with this email", 401);
  }
  // ===> CHECK OF THE PASSWORD IS CORRECT <===
  const comparePassword = await bcrypt.compare(password, userInfo.password);
  if (!comparePassword) {
    throw new ResponseError("There is no user with this password", 401);
  }

  CreateToken(userInfo, res);
};

// ===> REGISTER CONTROLLER <===
const Register = async (req, res) => {
  const { name, lastname, email, password } = req.body;

  // ===> CONTROL OF THE EMAIL IS EXIST <===
  const sameEmail = await UserModel.findOne({ email });
  if (sameEmail) {
    throw new ResponseError("There is a user with this email", 409);
  }
  if (!name || !lastname || !email || !password) {
    return new Response(null).BadRequest(res);
  }
  // ===> HASH THE PASSWORD AND CREATE A NEW USER <===
  req.body.password = await bcrypt.hash(req.body.password, 12);
  const newUser = new UserModel(req.body);
  await newUser
    .save()
    .then((user) => {
      const data = [user];
      return new Response(data).Create(res);
    })
    .catch(() => {
      throw new ResponseError("User can't be create", 404);
    });
};

// ===> GET THE LOGGED USER <===
const GetUser = (req, res) => {
  return new Response(req.user).Success(res);
};

module.exports = { Login, Register, GetUser };

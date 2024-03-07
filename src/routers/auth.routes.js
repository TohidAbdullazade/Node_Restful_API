const router = require("express").Router();
const { Login, Register, GetUser } = require("../controllers/auth.controller");
const AuthValidation = require("../middlewares/validation/auth.validation");
const { TokenCheck } = require("../middlewares/auth");

// ===> REGISTER ROUTER <===
router.post("/register", AuthValidation.RegisterValidation, Register);

// ===> LOGIN ROUTER <===
router.post("/login", AuthValidation.LoginValidation, Login);

// ===> GET USER  ROUTES <===
router.get("/user", TokenCheck, GetUser);

module.exports = router;

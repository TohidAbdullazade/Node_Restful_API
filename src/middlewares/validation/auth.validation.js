const joi = require("joi");
const ResponseError = require("../../utils/errors");

class AuthValidation {
  constructor() {}
  // ===> REGISTER VALIDATION WITH JOI MODULE <===
  static RegisterValidation = async (req, res, next) => {
    try {
      await joi
        .object({
          name: joi
            .string()
            .trim()
            .min(3)
            .max(50)
            .pattern(new RegExp("^[^0-9]+$"))
            .required()
            .messages({
              "string.base": "Enter valid values in the Name field",
              "string.empty": "Name field can't be empty",
              "string.min": "Name field must be least 3 characters",
              "string.max": "Name field must be max 50 characters",
              "string.required": "Name field is required",
              "string.pattern.base": "Name field can't contain numbers",
            }),
          lastname: joi
            .string()
            .trim()
            .min(5)
            .max(50)
            .pattern(new RegExp("^[^0-9]+$"))
            .required()
            .messages({
              "string.base": "Enter valid values in the Lastname field",
              "string.empty": "Lastname field can't be empty",
              "string.min": "Lastname field must be least 5 characters",
              "string.max": "Lastname field must be max 50 characters",
              "string.required": "Lastname field is required",
              "string.pattern.base": "Lastname field can't contain numbers",
            }),
          email: joi
            .string()
            .email()
            .trim()
            .min(13)
            .max(50)
            .required()
            .messages({
              "string.base": "Enter valid values in the Email field",
              "string.empty": "Email field can't be empty",
              "string.min": "Email field must be least 13 characters",
              "string.email": "Please enter a valid Email",
              "string.max": "Email field must be max 50 characters",
              "string.required": "Email field is required",
            }),
          password: joi.string().trim().min(6).max(36).required().messages({
            "string.base": "Enter valid values in the Password field",
            "string.empty": "Password field can't be empty",
            "string.min": "Password field must be least 6 characters",
            "string.max": "Password field must be max 36 characters",
            "string.required": "Password field is required",
          }),
        })
        .validateAsync(req.body);
    } catch (err) {
      if (err.details[0].message) {
        throw new ResponseError(err.details[0].message, 400);
      } else {
        throw new ResponseError("Follow the rules of validity", 400);
      }
    }
    next();
  };
  static LoginValidation = async (req, res, next) => {
    try {
      await joi
        .object({
          email: joi
            .string()
            .email()
            .trim()
            .min(13)
            .max(50)
            .required()
            .messages({
              "string.base": "Enter valid values in the Email field",
              "string.empty": "Email field can't be empty",
              "string.min": "Email field must be least 13 characters",
              "string.email": "Please enter a valid Email",
              "string.max": "Email field must be max 50 characters",
              "string.required": "Email field is required",
            }),
          password: joi.string().trim().min(6).max(36).required().messages({
            "string.base": "Enter valid values in the Password field",
            "string.empty": "Password field can't be empty",
            "string.min": "Password field must be least 6 characters",
            "string.max": "Password field must be max 36 characters",
            "string.required": "Password field is required",
          }),
        })
        .validateAsync(req.body);
    } catch (err) {
      if (err.details[0].message) {
        throw new ResponseError(err.details[0].message, 400);
      } else {
        throw new ResponseError("Follow the rules of validity", 400);
      }
    }
    next()
  };
}
module.exports = AuthValidation;

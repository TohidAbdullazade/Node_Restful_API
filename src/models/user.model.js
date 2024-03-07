const mongoose = require("mongoose");

//  ===> CREATE A USER SCHEMA <===
const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    lastname: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true, trim: true },
  },
  { timestamps: true, versionKey: false, collection: "Users" }
);

const UserModel = mongoose.model("UserModel", UserSchema);
module.exports = UserModel;

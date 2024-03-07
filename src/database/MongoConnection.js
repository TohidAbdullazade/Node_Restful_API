const mongoose = require("mongoose");
require("dotenv").config();

const MongoDBConnection = mongoose
  .connect(process.env.URL)
  .then(() => console.log("Connection on MongoDB DataBase successful"))
  .catch((err) => console.log("MongoDB Connection Error:", err.message));

module.exports = MongoDBConnection;

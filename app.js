// IMPORTED MODULES
require("express-async-errors");
require("dotenv").config();
require("./src/database/MongoConnection");
const express = require("express");
const router = require("./src/routers");
const ErrorMiddleware = require("./src/middlewares/errorHandler");
const port = process.env.PORT;
const app = express();
const corsOptions = require("./src/helpers/cors.options");
const cors = require("cors");
const path = require("path");
const Response = require("./src/utils/response");
const API_LIMITER = require("./src/middlewares/apiLimit");

// ===> MIDDLEWARES <===
app.use(express.json()); // BODY-PARSER
app.use(cors(corsOptions)); // CORS-ORIGIN
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(__dirname));
app.use("/api", API_LIMITER);

// ===> BASE ENDPOINT  <===
app.get("/", (req, res) => {
  return new Response(null, "Welcome on Home Page").Success(res);
});

// ===> ALL ROUTERS <===
app.use("/api", router);

// ===> ERROR MIDDLEWARE <===
app.use(ErrorMiddleware);

// ===> LISTENING SERVER <===
app.listen(port, () => {
  console.log(`Welcome on port:${port}`);
});

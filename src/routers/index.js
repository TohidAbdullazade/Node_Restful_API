const router = require("express").Router();
const multer = require("multer");
const upload = require("../middlewares/lib/upload");
const auth = require("./auth.routes");
const Response = require("../utils/response");

router.use(auth);

router.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return new Response(
        null,
        "This Mimetype is not supported, only Mimetypes such as end jpg,gif,jpeg and png are allowed"
      ).NotFound(res);
    } else if (err) {
      return new Response(
        null,
        "This Mimetype is not supported, only Mimetypes such as end jpg,gif,jpeg and png are allowed"
      ).NotFound(res);
    } else {
      return new Response(req.savedImages, "upload Successfull").Success(res);
    }
  });
});

module.exports = router;

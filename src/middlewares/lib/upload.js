const multer = require("multer");
const path = require("path");
const fs = require("fs");

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    "images/jpg",
    "image/gif",
    "image/jpeg",
    "image/png",
  ];
  if (!allowedMimeTypes.includes(file.mimetype)) {
    cb(
      new Error(
        "This Mimetype is not supported, only Mimetypes such as end jpg,gif,jpeg and png are allowed"
      ),
      false
    );
  }
  cb(null, true);
};
// ===> MAKE THE  PATH FOR THE UPLOADED FILE <===
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const MainRoute = path.dirname(require.main.filename);
    console.log("MainRoute:", require.main.filename);
    fs.mkdirSync(path.join(MainRoute, "/public/uploads"), { recursive: true });
    cb(null, path.join(MainRoute, "/public/uploads"));
  },
  filename: (req, file, cb) => {
    const extension = file.mimetype.split("/")[1];
    if (!req.savedImages) {
      req.savedImages = [];
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      let url = `image_${uniqueSuffix}.${extension}`;
      req.savedImages = [...req.savedImages, path.join(url)];
      cb(null, url);
    }
  },
});
const upload = multer({ storage, fileFilter }).array("images", 4);

module.exports = upload;

const multer = require("multer");

// diskStorage is for local storage
let myStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    let path = "public/images";
    callback(false, path);
  },
  filename: (req, file, callback) => {
    let name = Date.now() + file.originalname;
    callback(false, name);
  },
});

const imageFilter = (req, file, callback) => {
  let parts = file.originalname.split(".");
  let ext = parts.pop();

  let allowedExt = ["jpg", "jpeg", "gif", "png", "svg", "bmp", "webp"];

  if (allowedExt.includes(ext.toLowerCase())) {
    callback(false, true);
  } else {
    callback(true, false);
  }
};
const uploader = multer({
  storage: myStorage,
  fileFilter: imageFilter,
  limits: {
    fieldSize: 10000000,
  },
});

module.exports = uploader;

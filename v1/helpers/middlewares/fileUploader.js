const { update } = require("lodash");
const multer = require("multer");
const { extname } = (path = require("path"));

const fileUploader = (path) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `uploads/${path}`);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(
        null,
        file.fieldname + "-" + uniqueSuffix + extname(file.originalname)
      );
    },
  });
  return (upload = multer({ storage: storage }));
};

module.exports = fileUploader;

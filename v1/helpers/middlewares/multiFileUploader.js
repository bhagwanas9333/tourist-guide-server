const multer = require('multer');
const { extname } = require("path");

const multiFileUploader = (dir, fieldName, maxCount) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `uploads/${dir}`);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(
        null,
        file.fieldname + "-" + uniqueSuffix + extname(file.originalname)
      );
    },
  });

  return multer({
    storage: storage,
    limits: {
      fileSize: 5 * 1024 * 1024, // Set file size limit (5MB in this example)
    },
    fileFilter: function (req, file, cb) {
      if (file.mimetype.startsWith("image/")) {
        cb(null, true);
      } else {
        cb(new Error("Only images are allowed."));
      }
    },
  }).array(fieldName, maxCount);
};

module.exports = multiFileUploader;

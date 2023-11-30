const multer = require("multer");
const { extname } = require("path");


const multiFileUploader = (dir,field) => {
  console.log("field", field);

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `uploads/${dir}`);
    },

    filename: function (req, file, cb) {
      cb(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    },
  });

  const upload = multer({ storage: storage });

  // return upload.array([{ name: field, maxCount: 10 }]);
  return upload.array(field);
};

module.exports = multiFileUploader;

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

// const { update } = require("lodash");
// const multer = require("multer");
// const { extname } = (path = require("path"));

// const multiFileUploader = (path) => {
//   const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, `uploads/${path}`);
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//       cb(
//         null,
//         file.fieldname + "-" + uniqueSuffix + extname(file.originalname)
//       );
//     },
//   });
//   return (upload = multer({ storage: storage }));
// };

// module.exports = multiFileUploader;

// module.exports = multiFileUploader;
// const multer = require("multer");
// const fs = require("fs");
// const path = require("path");

// // Configure multer storage and file name
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// // Create multer upload instance
// const upload = multer({ storage: storage });

// // Custom file upload middleware
// const multiFileUploader = (req, res, next) => {
//   if (!req.headers || !req.headers["transfer-encoding"]) {
//     // Handle the case where req.headers or req.headers['transfer-encoding'] is undefined
//     // return res.status(400).json({ error: "Invalid request headers" });
//   }

//   // Use multer upload instance
//   upload.array("files", 5)(req, res, (err) => {
//     if (err) {
//       // return res.status(400).json({ error: err.message });
//     }

//     // Retrieve uploaded files
//     const files = req.files;
//     const errors = [];

//     // Validate file types and sizes
//     files.forEach((file) => {
//       const allowedTypes = ["image/jpeg", "image/png"];
//       const maxSize = 5 * 1024 * 1024; // 5MB

//       if (!allowedTypes.includes(file.mimetype)) {
//         errors.push(`Invalid file type: ${file.originalname}`);
//       }

//       if (file.size > maxSize) {
//         errors.push(`File too large: ${file.originalname}`);
//       }
//     });

//     // Handle validation errors
//     if (errors.length > 0) {
//       // Remove uploaded files
//       files.forEach((file) => {
//         fs.unlinkSync(file.path);
//       });

//       return res.status(400).json({ errors });
//     }

//     // Attach files to the request object
//     req.files = files;

//     // Proceed to the next middleware or route handler
//     next();
//   });
// };

// module.exports = multiFileUploader;

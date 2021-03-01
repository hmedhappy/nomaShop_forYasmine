//import multer
const multer = require('multer');
/* We will upload the file on server local directory, not in database. We will store the directory path into the database. */
// SET STORAGE
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    const now = new Date().toISOString();
    const date = now.replace(/:/g, '-');
    cb(null, date + file.originalname);
  },
});

// add image filter
// accept jpeg and png image
const fileFilter = (req, file, cb) => {
  if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const uploadImg = multer({ storage: storage, fileFilter: fileFilter });
exports.uploadImg = uploadImg;

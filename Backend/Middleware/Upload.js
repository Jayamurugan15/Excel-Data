const multer = require('multer');
const path = require("path");
const fs = require('fs');


const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    const filename = uniqueSuffix + extension;
    cb(null, filename);
  }
});


const fileSize = 3 * 1024 * 1024;

 const fileFilter = (req, file, cb) => {

  if (file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'){
    return cb(null, true);
  } else {
    return cb(new Error("Only Excel files are allowed (.xlsx, .xls, .csv)"), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: fileSize
  },
  fileFilter: fileFilter
});
 const Uploader = upload.single("File");
module.exports = Uploader;
const multer = require('multer');
// const path = require('path');
const { v4: uuid } = require('uuid');
const { HttpCode: { BAD_REQUEST },
} = require('./constants')

require('dotenv').config();
const UPLOAD_DIR = process.env.UPLOAD_DIR;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    cb(null, `${uuid()}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 2000000 },
  fileFilter: (req, file, cb) => {
      if (file.mimetype.includes('image')) {
        cb(null, true)
        return 
      }
      const error = new Error('Wrong format file for avatar')
      error.status = BAD_REQUEST
      cb(error)
  },
});

module.exports = upload;

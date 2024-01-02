const multer = require('multer');
const { v4 : uuidv4 } = require('uuid');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images/upload')
    },
    filename: function (req, file, cb) {
      const uniqueFilename = uuidv4()
      cb(null, uniqueFilename + path.extname(file.originalname))
    }
  })
  
  const upload = multer({ storage: storage, limits:{fileSize:15*1024*1024}});
  module.exports = upload; 
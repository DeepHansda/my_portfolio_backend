const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();
const pa = path.join(__dirname,"../uploads")
fs.exists(pa, (e) => {
  e ? console.log("folder exists")
    : fs.mkdir(pa, (err) => {
        err ? console.log(err) : console.log("folder created");
      });
});

console.log()


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },

  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "_" + file.originalname
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
    cb(null, true);
  } else {
    cb({ message: "file format not supported" }, false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

cloudinaryUploads = async (filePath, folder) => {
  return cloudinary.uploader
    .upload(filePath, { folder: folder })
    .then((result) => {
      fs.unlink(filePath,(err)=>{err? console.log(err):console.log("file cleared")});
      return {
        message: "upload successful",
        public_id: result.public_id,
        url: result.url,
      };
    })
    .catch((error) => {
      fs.unlink(filePath,(err)=>{err? console.log(err):console.log("file cleared")});
      return {
        message: "upload failed",
        error: error,
      };
    });
};

module.exports = {
  upload: upload,
  cloudinaryUploads: cloudinaryUploads,
};

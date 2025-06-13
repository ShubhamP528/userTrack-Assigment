const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname);
  if (![".jpg", ".png", ".pdf"].includes(ext.toLowerCase())) {
    return cb(new Error("Only .jpg, .png, .pdf allowed"), false);
  }
  cb(null, true);
};

module.exports = multer({ storage, fileFilter });

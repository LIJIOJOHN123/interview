const multer = require("multer");

const fileFilter = (req, file, cb) => {
  //reject
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./Images/Profiles/Avatars");
  },
  filename: function(req, file, cb) {
    const randomNumber = Math.floor(Math.random() * (200000 * 300000));
    cb(null, randomNumber + file.originalname);
  }
});
exports.upload = multer({ storage, fileFilter });

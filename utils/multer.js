const multer = require("multer");
const storage = multer.memoryStorage();
const uploadImg = multer({ storage });

module.exports = uploadImg;

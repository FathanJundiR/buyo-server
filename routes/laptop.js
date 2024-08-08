const express = require("express");
const router = express.Router();
const LaptopController = require("../controllers/laptopController");
// const upload = require("../utils/multer");

router.get("/", LaptopController.read);
router.post("/", LaptopController.add);
router.get("/:id", LaptopController.readById);
router.put("/:id", LaptopController.update);
router.delete("/:id", LaptopController.delete);
// router.patch(
//   "/:id",
//   [laptopAuthorization, upload.single("imgUrl")],
//   LaptopController.patchImgUrl
// );

module.exports = router;

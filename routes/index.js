const express = require("express");
const router = express.Router();
const { adminAuthorization } = require("../middlewares/authorization");
const authentication = require("../middlewares/authentication");
const errorHandler = require("../middlewares/errorHandler");
const AuthController = require("../controllers/authController");
const LaptopController = require("../controllers/laptopController");
const laptopRouter = require("./laptop");

router.post("/register", AuthController.addBuyer);
router.post("/login", AuthController.login);
router.post("/google-login", AuthController.googleLogin);
router.get("/ask-ai", LaptopController.askAi);
router.post("/cms/login", AuthController.cmsLogin);
router.get("/pub/laptops", LaptopController.read);
router.get("/pub/laptops/:id", LaptopController.readById);
// //>ADD_LATER
// router.get("/pub/categories", CategoryController.read);
// //ADD_LATER<
// router.get("/pub/articles/:id", ArticleController.readById);

router.use(authentication);
router.use("/laptops", laptopRouter);
// router.use("/categories", categoryRouter);

router.post("/add-staff", adminAuthorization, AuthController.addStaff);

router.use(errorHandler);

module.exports = router;

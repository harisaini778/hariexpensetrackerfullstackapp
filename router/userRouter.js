const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControllers");

router.use(express.static("public"));

router.get("/",userController.getLoginPage);

router.post("/signup",userController.postUserSignUp);

module.exports = router;

const express = require("express");
const {
  loginController,
  registerController,
  authController,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

//router object
const router = express.Router();

//routes
// POST || LOGIN USER
router.post("/login", loginController);

//POST || REGISTER USER
router.post("/register", registerController);

//Auth || POST
router.post("/getUserData", authMiddleware, authController);

module.exports = router;
const express = require("express");
const router = express.Router();

const {
  registartion,
  login,
  getUserInfo
} = require("./controller/userController");
const authMiddleware = require("./middleware/authMiddleware");
const {
  registerMiddlware,
  loginMiddlware
} = require("./middleware/userMiddleware");

/*********************************** guest routers *********************************************/
router.post("/register", registerMiddlware, registartion);
router.post("/login", loginMiddlware, login);

/*********************************** users routers *********************************************/
//user @private
router.get("/user", authMiddleware, getUserInfo);

module.exports = router;

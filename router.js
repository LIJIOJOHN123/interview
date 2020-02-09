const express = require("express");
const router = express.Router();
const { upload } = require("./middleware/fileUploadMiddlware");

const {
  registartion,
  login,
  updateUserInfo,
  getUserInfo,
  createAdmin,
  blockUser,
  unblockUser
} = require("./controller/userController");
const authMiddleware = require("./middleware/authMiddleware");
const {
  registerMiddlware,
  loginMiddlware,
  editUserMiddlware
} = require("./middleware/userMiddleware");
const {
  addProfile,
  editProfile,
  addProfileImage,
  getProfile,
  getProfiles,
  getProfileById
} = require("./controller/profileController");

/*********************************** guest routers *********************************************/
router.post("/register", registerMiddlware, registartion);
router.post("/login", loginMiddlware, login);

/*********************************** users routers *********************************************/
//user @private
router.put("/user", authMiddleware, editUserMiddlware, updateUserInfo);
router.get("/user", authMiddleware, getUserInfo);
//profile @private
router.post("/profile", authMiddleware, addProfile);
router.put("/profile", authMiddleware, editProfile);
let profilePhoto = upload.fields([
  { name: "avatar", maxCount: 1 },
  { name: "coverPhoto", maxCount: 1 }
]);
router.post("/profile/upload", profilePhoto, authMiddleware, addProfileImage);
router.get("/profile", authMiddleware, getProfile);
//profile @public
router.get("/profiles", getProfiles);
router.get("/profile/:id", getProfileById);

/*********************************** admin routers *********************************************/
router.post("/admin", createAdmin);
router.post("/admin/blockuser/:id", authMiddleware, blockUser);
router.post("/admin/unblockuser/:id", authMiddleware, unblockUser);

module.exports = router;

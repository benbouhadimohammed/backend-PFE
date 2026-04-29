const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authmiddleware");

const {
  getProfile,
  updateProfile,
  changePassword,
  deleteAccount,
} = require("../controllers/usercontroller");

// 👤 PROFILE
router.get("/profile", authMiddleware, getProfile);

// ✏️ UPDATE PROFILE
router.put("/profile", authMiddleware, updateProfile);

// 🔐 CHANGE PASSWORD
router.put("/profile/password", authMiddleware, changePassword);

// 🗑 DELETE ACCOUNT
router.delete("/profile", authMiddleware, deleteAccount);

module.exports = router;
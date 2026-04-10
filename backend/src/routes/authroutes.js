const express = require("express");
const router = express.Router();
const { login, register, adminLogin } = require("../controllers/authcontroller");
const authMiddleware = require("../middleware/authmiddleware");
const adminMiddleware = require("../middleware/authmiddleware");

router.post("/login", login);
router.post("/register", register);
router.post("/admin/login", adminLogin);

router.get("/protected", authMiddleware, (req, res) => {
  res.json({ message: "Access granted", user: req.user });
});

router.get("/dashboard", authMiddleware, adminMiddleware, (req, res) => {
  res.json({ message: "Welcome Admin" });
});

module.exports = router;
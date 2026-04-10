const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authmiddleware");
const adminMiddleware = require("../middleware/authmiddleware");
const {
  getStats,
  getAllUsers,
  deleteUser,
  getAllAnnonces,
  deleteAnnonce,
  getAllPosts,
  deletePost,
} = require('../controllers/admincontroller')
const protect = [authMiddleware, adminMiddleware]



router.get('/stats',           ...protect, getStats)
router.get('/users',           ...protect, getAllUsers)
router.delete('/users/:id',    ...protect, deleteUser)
router.get('/annonces',        ...protect, getAllAnnonces)
router.delete('/annonces/:id', ...protect, deleteAnnonce)
router.get('/forum',           ...protect, getAllPosts)
router.delete('/forum/:id',    ...protect, deletePost)

module.exports = router;
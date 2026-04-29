const express = require("express");
const router = express.Router();
const {
  addAnnonce,
  listerAnnonces,
  voirAnnonce,
  editAnnonce,
  removeAnnonce,
} = require("../controllers/annoncecontroller");
const authMiddleware = require("../middleware/authmiddleware");

// Routes publiques (sans token)
router.get("/listerAnnonces", listerAnnonces);
router.get("/voirAnnonce/:id", voirAnnonce);

// Routes protégées (token requis)
router.post("/addAnnonce", authMiddleware, addAnnonce);
router.put("/editAnnonce/:id", authMiddleware, editAnnonce);
router.delete("/removeAnnonce/:id", authMiddleware, removeAnnonce);

module.exports = router;
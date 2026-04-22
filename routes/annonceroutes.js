const express = require("express");
const router = express.Router();
const {
  ajouterAnnonce,
  listerAnnonces,
  voirAnnonce,
  modifierAnnonce,
  supprimerAnnonce,
} = require("../controllers/annoncecontroller");
const authMiddleware = require("../middleware/authmiddleware");

// Routes publiques (sans token)
router.get("/", listerAnnonces);
router.get("/:id", voirAnnonce);

// Routes protégées (token requis)
router.post("/", authMiddleware, addAnnonce);
router.put("/:id", authMiddleware, editAnnonce);
router.delete("/:id", authMiddleware, removeAnnonce);

module.exports = router;
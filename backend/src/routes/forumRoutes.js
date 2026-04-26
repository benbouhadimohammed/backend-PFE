'use strict';

const express       = require('express');
const router        = express.Router();
const authMiddleware = require('../middleware/authmiddleware');
const {
  creerSujet,
  listerSujets,
  rechercherSujets,
  obtenirSujet,
  fermerSujet,
  supprimerSujet,
  ajouterCommentaire,
  supprimerCommentaire,
} = require('../controllers/forumController');

router.use(authMiddleware);

// ── Sujets ────────────────────────────────────────────────────
router.get('/',             listerSujets);
router.get('/recherche',    rechercherSujets);
router.get('/:id',          obtenirSujet);
router.post('/',            creerSujet);
router.patch('/:id/fermer', fermerSujet);
router.delete('/:id',       supprimerSujet);

// ── Commentaires ─────────────────────────────────────────────
router.post('/:id/commentaires',                            ajouterCommentaire);   // POST   /api/forum/:id/commentaires
router.delete('/:sujetId/commentaires/:commentaireId',      supprimerCommentaire); // DELETE /api/forum/:sujetId/commentaires/:commentaireId

module.exports = router;

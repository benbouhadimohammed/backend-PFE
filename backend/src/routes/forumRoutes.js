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

// Toutes les routes du forum exigent d'être connecté.
// Le contrôle admin (fermer/supprimer sujet) est géré dans le service.
router.use(authMiddleware);

// ── Sujets ────────────────────────────────────────────────────
router.get('/',               listerSujets);       // GET  /api/forum
router.get('/recherche',      rechercherSujets);   // GET  /api/forum/recherche?q=...
router.get('/:id',            obtenirSujet);       // GET  /api/forum/:id
router.post('/',              creerSujet);         // POST /api/forum
router.patch('/:id/fermer',   fermerSujet);        // PATCH /api/forum/:id/fermer  (admin)
router.delete('/:id',         supprimerSujet);     // DELETE /api/forum/:id        (admin)

// ── Commentaires ─────────────────────────────────────────────
router.post('/:id/commentaires',                            ajouterCommentaire);   // POST   /api/forum/:id/commentaires
router.delete('/:sujetId/commentaires/:commentaireId',      supprimerCommentaire); // DELETE /api/forum/:sujetId/commentaires/:commentaireId

module.exports = router;

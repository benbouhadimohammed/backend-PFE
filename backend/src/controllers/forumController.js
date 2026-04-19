'use strict';

// Le contrôleur reçoit les requêtes HTTP, appelle le service,
// et renvoie toujours une réponse propre au client.
// Chaque handler est entouré d'un try/catch — le serveur ne plantera jamais.

const forumService = require('../services/gestionforum');
const pool = require('../config/db');

async function getUserId(email) {
  const result = await pool.query('SELECT id_user FROM users WHERE email = $1', [email]);
  if (!result.rows[0]) throw new Error('Utilisateur introuvable.');
  return result.rows[0].id_user;
}

// ============================================================
//  Helpers
// ============================================================

function parseId(valeur) {
  const id = parseInt(valeur, 10);
  if (isNaN(id)) throw new Error('Identifiant invalide.');
  return id;
}

function erreurStatut(message) {
  if (message.includes('introuvable'))             return 404;
  if (message.includes('autorisé') ||
      message.includes('admin'))                   return 403;
  if (message.includes('déjà') ||
      message.includes('fermé') ||
      message.includes('obligatoire') ||
      message.includes('vide'))                    return 400;
  return 500;
}

// ============================================================
//  Sujets
// ============================================================

/**
 * POST /api/forum
 * Body : { titre, contenu }
 * Authentifié : oui — auteurId = req.user.id
 */
const creerSujet = async (req, res) => {
  try {
    const { titre, contenu } = req.body;
    const auteurId = await getUserId(req.user.email);
    const sujet = await forumService.creerSujet({ titre, contenu, auteurId });
    res.status(201).json(sujet);
  } catch (error) {
    res.status(erreurStatut(error.message)).json({ message: error.message });
  }
};

/**
 * GET /api/forum?ouverts=true
 * Authentifié : oui
 */
const listerSujets = async (req, res) => {
  try {
    const ouvertsUniquement = req.query.ouverts === 'true';
    const sujets = await forumService.listerSujets({ ouvertsUniquement });
    res.status(200).json(sujets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET /api/forum/recherche?q=motcle
 * Authentifié : oui
 */
const rechercherSujets = async (req, res) => {
  try {
    const sujets = await forumService.rechercherSujets(req.query.q);
    res.status(200).json(sujets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * GET /api/forum/:id
 * Authentifié : oui
 */
const obtenirSujet = async (req, res) => {
  try {
    const sujet = await forumService.obtenirSujet(parseId(req.params.id));
    res.status(200).json(sujet);
  } catch (error) {
    res.status(erreurStatut(error.message)).json({ message: error.message });
  }
};

/**
 * PATCH /api/forum/:id/fermer
 * Authentifié : oui — réservé admin (vérifié dans le service)
 */
const fermerSujet = async (req, res) => {
  try {
    const sujet = await forumService.fermerSujet(parseId(req.params.id), req.user);
    res.status(200).json(sujet);
  } catch (error) {
    res.status(erreurStatut(error.message)).json({ message: error.message });
  }
};

/**
 * DELETE /api/forum/:id
 * Authentifié : oui — réservé admin (vérifié dans le service)
 */
const supprimerSujet = async (req, res) => {
  try {
    await forumService.supprimerSujet(parseId(req.params.id), req.user);
    res.status(204).send();
  } catch (error) {
    res.status(erreurStatut(error.message)).json({ message: error.message });
  }
};

// ============================================================
//  Commentaires
// ============================================================

/**
 * POST /api/forum/:id/commentaires
 * Body : { contenu }
 * Authentifié : oui — auteurId = req.user.id
 */
const ajouterCommentaire = async (req, res) => {
  try {
    const auteurId = await getUserId(req.user.email);
    const commentaire = await forumService.ajouterCommentaire(
      parseId(req.params.id),
      { contenu: req.body.contenu, auteurId }
    );
    res.status(201).json(commentaire);
  } catch (error) {
    res.status(erreurStatut(error.message)).json({ message: error.message });
  }
};

/**
 * DELETE /api/forum/:sujetId/commentaires/:commentaireId
 * Authentifié : oui — auteur du commentaire ou admin
 */
const supprimerCommentaire = async (req, res) => {
  try {
    const id = await getUserId(req.user.email);
    await forumService.supprimerCommentaire(
      parseId(req.params.sujetId),
      parseId(req.params.commentaireId),
      { ...req.user, id }
    );
    res.status(204).send();
  } catch (error) {
    res.status(erreurStatut(error.message)).json({ message: error.message });
  }
};

module.exports = {
  creerSujet,
  listerSujets,
  rechercherSujets,
  obtenirSujet,
  fermerSujet,
  supprimerSujet,
  ajouterCommentaire,
  supprimerCommentaire,
};

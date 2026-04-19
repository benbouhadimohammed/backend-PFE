'use strict';

// Le service orchestre la logique métier.
// Il délègue toute persistance au modèle (forumModel).
// La base de données gère les IDs — plus de compteurs en mémoire.

const {
  createSujetDb,
  getAllSujetsDb,
  searchSujetsDb,
  getSujetByIdDb,
  closeSujetDb,
  deleteSujetDb,
  addCommentaireDb,
  getCommentaireByIdDb,
  softDeleteCommentaireDb,
} = require('../models/forumModel');

// ============================================================
//  Helpers privés
// ============================================================

function validerTexte(valeur, nom) {
  if (!valeur || typeof valeur !== 'string' || valeur.trim() === '') {
    throw new Error(`${nom} est obligatoire et ne peut pas être vide.`);
  }
}

function estAdmin(demandeur) {
  // Le token JWT signé lors de adminLogin contient { role: user.rolee }
  // donc req.user.role === 'admin' pour un administrateur.
  return demandeur != null && demandeur.role === 'admin';
}

async function obtenirSujetOuErreur(sujetId) {
  const sujet = await getSujetByIdDb(sujetId);
  if (!sujet) throw new Error(`Sujet ${sujetId} introuvable.`);
  return sujet;
}

// ============================================================
//  Gestion des sujets
// ============================================================

/**
 * Valide et crée un nouveau sujet en base.
 * @param {{ titre: string, contenu: string, auteurId: number }} données
 */
async function creerSujet({ titre, contenu, auteurId }) {
  validerTexte(titre, 'titre');
  validerTexte(contenu, 'contenu');
  if (!auteurId) throw new Error('auteurId est obligatoire.');
  return await createSujetDb(titre.trim(), contenu.trim(), auteurId);
}

/**
 * Liste tous les sujets. Option pour filtrer les sujets ouverts uniquement.
 * @param {{ ouvertsUniquement?: boolean }} options
 */
async function listerSujets({ ouvertsUniquement = false } = {}) {
  return await getAllSujetsDb(ouvertsUniquement);
}

/**
 * Recherche les sujets par titre (insensible à la casse).
 * @param {string} motCle
 */
async function rechercherSujets(motCle) {
  if (!motCle || motCle.trim() === '') return await getAllSujetsDb();
  return await searchSujetsDb(motCle.trim());
}

/**
 * Retourne un sujet précis ou lève une erreur s'il n'existe pas.
 * @param {number} id
 */
async function obtenirSujet(id) {
  return await obtenirSujetOuErreur(id);
}

/**
 * Ferme un sujet — réservé à l'admin.
 * @param {number} sujetId
 * @param {{ role: string }} demandeur  — issu de req.user (JWT)
 */
async function fermerSujet(sujetId, demandeur) {
  if (!estAdmin(demandeur)) throw new Error('Seul un admin peut fermer un sujet.');
  await obtenirSujetOuErreur(sujetId);        // vérifie que le sujet existe
  const sujet = await closeSujetDb(sujetId);
  if (!sujet) throw new Error('Ce sujet est déjà fermé.');
  return sujet;
}

/**
 * Supprime définitivement un sujet et ses commentaires — réservé à l'admin.
 * @param {number} sujetId
 * @param {{ role: string }} demandeur
 */
async function supprimerSujet(sujetId, demandeur) {
  if (!estAdmin(demandeur)) throw new Error('Seul un admin peut supprimer un sujet.');
  await obtenirSujetOuErreur(sujetId);        // vérifie que le sujet existe
  await deleteSujetDb(sujetId);
}

// ============================================================
//  Gestion des commentaires
// ============================================================

/**
 * Ajoute un commentaire à un sujet ouvert.
 * @param {number} sujetId
 * @param {{ contenu: string, auteurId: number }} données
 */
async function ajouterCommentaire(sujetId, { contenu, auteurId }) {
  validerTexte(contenu, 'contenu');
  if (!auteurId) throw new Error('auteurId est obligatoire.');

  const sujet = await obtenirSujetOuErreur(sujetId);
  if (sujet.est_ferme) {
    throw new Error("Impossible d'ajouter un commentaire : le sujet est fermé.");
  }

  return await addCommentaireDb(sujetId, contenu.trim(), auteurId);
}

/**
 * Suppression (soft-delete) d'un commentaire.
 * Autorisé à l'auteur du commentaire ou à un admin.
 * @param {number} sujetId
 * @param {number} commentaireId
 * @param {{ id: number, role: string }} demandeur
 */
async function supprimerCommentaire(sujetId, commentaireId, demandeur) {
  await obtenirSujetOuErreur(sujetId);        // vérifie que le sujet existe

  const commentaire = await getCommentaireByIdDb(commentaireId);
  if (!commentaire) throw new Error(`Commentaire ${commentaireId} introuvable.`);

  if (commentaire.sujet_id !== sujetId) {
    throw new Error('Ce commentaire n\'appartient pas à ce sujet.');
  }

  const estAuteur = demandeur != null && demandeur.id === commentaire.auteur_id;
  if (!estAuteur && !estAdmin(demandeur)) {
    throw new Error("Vous n'êtes pas autorisé à supprimer ce commentaire.");
  }

  const result = await softDeleteCommentaireDb(commentaireId);
  if (!result) throw new Error('Ce commentaire est déjà supprimé.');
}

// ============================================================
//  Exports
// ============================================================

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

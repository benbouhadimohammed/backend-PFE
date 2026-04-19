'use strict';

const pool = require('../config/db');

// ============================================================
//  Sujets
// ============================================================

async function createSujetDb(titre, contenu, auteurId) {
  const result = await pool.query(
    `INSERT INTO sujets_forum (titre, contenu, auteur_id)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [titre, contenu, auteurId]
  );
  return result.rows[0];
}

async function getAllSujetsDb(ouvertsUniquement = false) {
  const sql = ouvertsUniquement
    ? `SELECT * FROM sujets_forum WHERE est_ferme = FALSE ORDER BY date_creation DESC`
    : `SELECT * FROM sujets_forum ORDER BY date_creation DESC`;
  const result = await pool.query(sql);
  return result.rows;
}

async function searchSujetsDb(motCle) {
  // ILIKE = insensible à la casse côté PostgreSQL
  const result = await pool.query(
    `SELECT * FROM sujets_forum WHERE titre ILIKE $1 ORDER BY date_creation DESC`,
    [`%${motCle}%`]
  );
  return result.rows;
}

async function getSujetByIdDb(id) {
  const result = await pool.query(
    `SELECT * FROM sujets_forum WHERE id = $1`,
    [id]
  );
  return result.rows[0] ?? null;
}

/**
 * Retourne null si le sujet était déjà fermé ou inexistant.
 */
async function closeSujetDb(id) {
  const result = await pool.query(
    `UPDATE sujets_forum
     SET est_ferme = TRUE
     WHERE id = $1 AND est_ferme = FALSE
     RETURNING *`,
    [id]
  );
  return result.rows[0] ?? null;
}

async function deleteSujetDb(id) {
  // ON DELETE CASCADE dans le schéma supprime les commentaires liés
  await pool.query(`DELETE FROM sujets_forum WHERE id = $1`, [id]);
}

// ============================================================
//  Commentaires
// ============================================================

async function addCommentaireDb(sujetId, contenu, auteurId) {
  const result = await pool.query(
    `INSERT INTO commentaires_forum (sujet_id, contenu, auteur_id)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [sujetId, contenu, auteurId]
  );
  return result.rows[0];
}

async function getCommentairesBysujetDb(sujetId) {
  const result = await pool.query(
    `SELECT * FROM commentaires_forum
     WHERE sujet_id = $1
     ORDER BY date_envoi ASC`,
    [sujetId]
  );
  return result.rows;
}

async function getCommentaireByIdDb(commentaireId) {
  const result = await pool.query(
    `SELECT * FROM commentaires_forum WHERE id = $1`,
    [commentaireId]
  );
  return result.rows[0] ?? null;
}

/**
 * Soft-delete : passe est_supprime à TRUE et efface le contenu.
 * Retourne null si déjà supprimé.
 */
async function softDeleteCommentaireDb(commentaireId) {
  const result = await pool.query(
    `UPDATE commentaires_forum
     SET est_supprime = TRUE,
         contenu      = '[commentaire supprimé]'
     WHERE id = $1 AND est_supprime = FALSE
     RETURNING *`,
    [commentaireId]
  );
  return result.rows[0] ?? null;
}

module.exports = {
  createSujetDb,
  getAllSujetsDb,
  searchSujetsDb,
  getSujetByIdDb,
  closeSujetDb,
  deleteSujetDb,
  addCommentaireDb,
  getCommentairesBysujetDb,
  getCommentaireByIdDb,
  softDeleteCommentaireDb,
};

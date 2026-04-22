const pool = require('../config/db');

// Ajouter une annonce
const createAnnonce = async (titre, description, type_travail, prix, wilaya, id_user) => {
  const result = await pool.query(
    `INSERT INTO annonces (titre, description, type_travail, prix, wilaya, id_user)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [titre, description, type_travail, prix, wilaya, id_user]
  );
  return result.rows[0];
};

// Supprimer une annonce
const deleteAnnonce = async (id_annonce, id_user) => {
  const result = await pool.query(
    `DELETE FROM annonces WHERE id_annonce=$1 AND id_user=$2 RETURNING *`,
    [id_annonce, id_user]
  );
  return result.rows[0];
};

// Modifier une annonce
const updateAnnonce = async (
  id_annonce,
  titre,
  description,
  type_travail,
  prix,
  wilaya,
  id_user
) => {
  const result = await pool.query(
    `UPDATE annonces
     SET titre=$1, description=$2, type_travail=$3, prix=$4, wilaya=$5
     WHERE id_annonce=$6 AND id_user=$7
     RETURNING *`,
    [titre, description, type_travail, prix, wilaya, id_annonce, id_user]
  );
  return result.rows[0];
};

// Lister toutes les annonces
const getAllAnnonces = async () => {
  const result = await pool.query(
    "SELECT * FROM annonces ORDER BY created_at DESC"
  );
  return result.rows;
};

// Voir une seule annonce
const getAnnonceById = async (id_annonce) => {
  const result = await pool.query(
    "SELECT * FROM annonces WHERE id_annonce=$1",
    [id_annonce]
  );
  return result.rows[0];
};

module.exports = {
  createAnnonce,
  deleteAnnonce,
  updateAnnonce,
  getAllAnnonces,
  getAnnonceById
};
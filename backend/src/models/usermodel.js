const pool = require('../config/db');
const bcrypt = require("bcrypt");

const findUserByEmail = async (email) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE email=$1",
    [email]
  );
  return result.rows[0];
};
const createUser = async (nom, email, hashedPassword, type_user) => {
  try {
    
    const result = await pool.query(
      "INSERT INTO users (nom, email, mot_de_passe, type_user) VALUES ($1, $2, $3, $4) returning *",
      [nom, email, hashedPassword, type_user]
    );
    return result.rows[0];
  
    
  } catch (error) {
    console.error("❌ Error:", error);
  }
};
module.exports = { findUserByEmail, createUser };


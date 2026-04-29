const pool = require('../config/db');
const bcrypt = require("bcrypt");

const findUserByEmail = async (email) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE email=$1",
    [email]
  );
  return result.rows[0];
};
const createUser = async (nom, email, hashedPassword) => {
  try {
    

    const result = await pool.query(
      "INSERT INTO users (nom, email, mot_de_passe) VALUES ($1, $2, $3) returning *",
      [nom, email, hashedPassword]
    );
    return result.rows[0];
  
    
  } catch (error) {
    console.error("❌ Error:", error);
  }
};
module.exports = { findUserByEmail, createUser };


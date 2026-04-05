const pool = require('../config/db');
const bcrypt = require("bcrypt");

const findUserByEmail = async (email) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE email=$1",
    [email]
  );
  return result.rows[0];
};
const createUser = async () => {
  try {
    const nom = "test";
    const email = "test@gmail.com";
    const password = "123456";
    const hashedPassword = await bcrypt.hash(password, 10);


    await pool.query(
      "INSERT INTO users (nom, email, mot_de_passe) VALUES ($1, $2, $3)",
      [nom, email, hashedPassword]
    );

    console.log("✅ User created successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Error:", error);
  }
};
module.exports = { findUserByEmail, createUser };


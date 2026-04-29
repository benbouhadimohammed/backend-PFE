const bcrypt = require("bcrypt");
const {
  getUserById,
  updateUser,
  updatePassword,
  deleteUser,
} = require("../models/usermodel");
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
const userModel = require("../models/usermodel");

console.log(userModel);

// 👤 GET PROFILE
const getProfile = async (req, res) => {
  try {
    console.log("USER ID:", req.user.id);
    const user = await getUserById(req.user.id);
    console.log("USER FROM DB:", user);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✏️ UPDATE PROFILE
const updateProfile = async (req, res) => {
  try {
    const { nom, email } = req.body;
     
    const user = await updateUser(req.user.id, nom, email);

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🔐 CHANGE PASSWORD
const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const user = await getUserById(req.user.id);
    console.log("USER FOR PASSWORD CHANGE:", req.user);

    const isMatch = await bcrypt.compare(oldPassword, user.mot_de_passe);

    if (!isMatch) {
      return res.status(400).json({ message: "Ancien mot de passe incorrect" });
    }

     if (!PASSWORD_REGEX.test(newPassword)) {
      return res.status(400).json({
        message: "Password must be at least 8 characters, include uppercase, lowercase and a number",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await updatePassword(req.user.id, hashedPassword);

    res.json({ message: "Mot de passe mis à jour" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🗑 DELETE ACCOUNT
const deleteAccount = async (req, res) => {
  try {
    await deleteUser(req.user.id);
    res.json({ message: "Compte supprimé" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  changePassword,
  deleteAccount,
};
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { findUserByEmail, createUser } = require("../models/usermodel");


const register = async (req, res) => {
  try {
    const { nom, email, password } = req.body;

    
    if (!nom || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const user = await createUser(nom, email, hashedPassword);

    
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      message: "User registered",
      token,
      user,
    });
  } catch (error) {
    console.error('Registration error:', error) 
    res.status(500).json({ message: error.message })
  }
};



const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    
    const user = await findUserByEmail(email);
    console.log("user found");
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    
    }

    const isMatch = await bcrypt.compare(password, user.mot_de_passe);
    console.log("password match");
    if (!isMatch) {
      return res.status(400).json({ message: "Wrong password" });
      
    }

    
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    
    res.json({ token });
  } catch (error) {
    
     console.error('Login error:', error) 
  res.status(500).json({ message: error.message })
  }
};



module.exports = { login, register };
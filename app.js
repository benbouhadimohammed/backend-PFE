require("dotenv").config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const JWT= process.env.JWT_SECRET;
const pool = require("./config/db");
const authRoutes = require("./routes/authroutes");
const authMiddleware = require("./middleware/authmiddleware");
const annoncesRoutes = require("./routes/annonceroutes");

app.use(express.json());
app.use("/api/annonces", annoncesRoutes);


app.use("/api/auth", authRoutes);

app.get("/protected", authMiddleware, (req, res) => {
  res.json({
    message: "Access granted",
    user: req.user
  });
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});



app.get("/test-db", async (req, res) => {
  const result = await pool.query("SELECT NOW()");
  res.json(result.rows);
});


const annonceRoutes = require("./routes/annonceroutes");

app.use("/api/annonces", annonceRoutes);
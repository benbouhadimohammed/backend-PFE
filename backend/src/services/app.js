require("dotenv").config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
const JWT= process.env.JWT_SECRET;
const pool = require("../config/db");
const authroutes = require("../routes/authroutes");
const adminroutes = require("../routes/adminroutes");
const forumRoutes = require("../routes/forumRoutes");
app.use(express.json());



app.use("/api/forum", forumRoutes);
app.use("/api", adminroutes);
app.use("/api/auth", authroutes);


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


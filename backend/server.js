const express = require("express");
const cors = require("cors");
const { Pool } = require("pg"); // Import PostgreSQL client
require("dotenv").config(); // Load environment variables

const app = express();
app.use(cors());
app.use(express.json());

// PostgreSQL Database Connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Test Database Connection
pool.connect()
  .then(() => console.log("✅ Connected to PostgreSQL"))
  .catch((err) => console.error("❌ Database connection error:", err));

// API Route to Test Database Connection
app.get("/api/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW();"); // Test query
    res.json({ message: "Database connected!", time: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: "Database query failed", details: err });
  }
});

// API endpoint to get all games
app.get("/games", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM games;");
    res.status(200).json(result.rows);  // Respond with the games data
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching games from the database");
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
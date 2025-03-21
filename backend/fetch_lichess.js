const axios = require("axios");
const { Pool } = require("pg");
require("dotenv").config();

// Set up database connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Lichess API URL
const LICHESS_API_URL = "https://lichess.org/api/game/export/";

async function insertGame(gameData) {
  const { id, players, turns, status } = gameData;
  const whitePlayer = players.white.name;
  const blackPlayer = players.black.name;

  const insertQuery = `
    INSERT INTO games (title, white_player, black_player, moves, status)
    VALUES ($1, $2, $3, $4, $5)
  `;

  try {
    await pool.query(insertQuery, [
      id,
      whitePlayer,
      blackPlayer,
      turns, // You can format the moves later based on your needs
      status,
    ]);
    console.log("Game data inserted successfully!");
  } catch (err) {
    console.error("Error inserting game data:", err.message);
  }
}

async function fetchGame(gameId) {
  try {
    const response = await axios.get(`${LICHESS_API_URL}${gameId}`, {
      headers: {
        "Accept": "application/x-ndjson",
      },
    });

    const game = response.data;
    console.log("✅ Found Game:", game);

    // Insert game data into database
    await insertGame(game);
  } catch (error) {
    console.error("Error fetching game:", error.message);
  }
}

// Use the game ID from the provided link
fetchGame("FbwSGQj3");
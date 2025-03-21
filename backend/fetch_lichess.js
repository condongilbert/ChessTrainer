require("dotenv").config(); // Load environment variables
const axios = require("axios");
const { Pool } = require("pg");

// PostgreSQL connection using .env variables
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const gameId = "FbwSGQj3";  
const url = `https://lichess.org/game/export/${gameId}?moves=true&json=true`;

async function fetchGameMoves() {
  try {
    const response = await axios.get(url, {
      headers: { "Authorization": `Bearer ${process.env.LICHESS_API_TOKEN}` },
    });

    const gameData = response.data;
    console.log("Game Data Retrieved:", gameData);

    if (!gameData.moves) {
      console.log("No moves found.");
      return;
    }

    // Extracting relevant fields
    const { id, players, opening, moves, status } = gameData;
    const whitePlayer = players.white.name;
    const blackPlayer = players.black.name;
    const whiteRating = players.white.rating;
    const blackRating = players.black.rating;
    const openingName = opening ? opening.name : "Unknown";
    const result = status;

    // Store in PostgreSQL
    await saveGameToDatabase(id, whitePlayer, blackPlayer, whiteRating, blackRating, openingName, moves, result);
    
  } catch (error) {
    console.error("Error fetching game data:", error.message);
  }
}

// Function to insert game data into PostgreSQL
async function saveGameToDatabase(gameId, white, black, whiteRating, blackRating, opening, moves, result) {
  try {
    const query = `
      INSERT INTO lichess_games (game_id, white_player, black_player, white_rating, black_rating, opening, moves, result)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      ON CONFLICT (game_id) DO NOTHING;
    `;

    await pool.query(query, [gameId, white, black, whiteRating, blackRating, opening, moves, result]);
    console.log(`Game ${gameId} stored successfully.`);
  } catch (error) {
    console.error("Error saving game to database:", error.message);
  }
}

// Fetch and store the game
fetchGameMoves();

import React, { useEffect, useState } from "react";
import axios from "axios";
import Chess from "chess.js";
import Chessboard from "chessboardjs";

function App() {
  const [message, setMessage] = useState("");
  const [gameMoves, setGameMoves] = useState([]);

  // Fetch the message and game moves
  useEffect(() => {
    // Fetching message from the backend
    axios
      .get("http://localhost:5000/")
      .then((response) => setMessage(response.data))
      .catch((error) => console.error(error));

    // Fetching game moves (adjust the endpoint to match your API)
    axios
      .get("http://localhost:5000/api/games/FbwSGQj3") // Replace with your actual game ID
      .then((response) => setGameMoves(response.data.moves))
      .catch((error) => console.error("Error fetching game moves:", error));
  }, []);

  useEffect(() => {
    if (gameMoves.length === 0) return; // Don't do anything if moves are empty

    const board = new Chessboard("#board1");
    const game = new Chess();

    // Apply the moves to the chessboard
    gameMoves.forEach((move, index) => {
      setTimeout(() => {
        game.uci(move); // Apply move to the game logic
        board.position(game.fen()); // Update the board's position
      }, index * 1000); // Delay each move by 1 second
    });
  }, [gameMoves]);

  return (
    <div>
      <h1>Chess Trainer</h1>
      <p>{message}</p>

      <div id="board1" style={{ width: "400px", marginTop: "20px" }}></div>
    </div>
  );
}

export default App;
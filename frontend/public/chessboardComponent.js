import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chess from 'chess.js';
import Chessboard from 'chessboardjs';

const ChessboardComponent = ({ gameId }) => {
  const [gameMoves, setGameMoves] = useState([]);

  useEffect(() => {
    // Fetch the game moves from the backend
    const fetchGameMoves = async () => {
      try {
        const response = await axios.get(`/api/games/${gameId}`); // Adjust the endpoint to your backend API
        setGameMoves(response.data.moves);
      } catch (error) {
        console.error("Error fetching game moves:", error);
      }
    };

    fetchGameMoves();
  }, [gameId]);

  useEffect(() => {
    if (gameMoves.length === 0) return; // Wait until moves are available
    
    const board = new Chessboard('#board1');
    const game = new Chess();

    // Apply the moves to the chessboard
    gameMoves.forEach((move, index) => {
      setTimeout(() => {
        game.uci(move);  // Apply move to the game logic
        board.position(game.fen()); // Update the board's position
      }, index * 1000); // Delay each move by 1 second
    });
  }, [gameMoves]);

  return (
    <div>
      <h1>Chess Game</h1>
      <div id="board1" style={{ width: '400px' }}></div>
    </div>
  );
};

export default ChessboardComponent;
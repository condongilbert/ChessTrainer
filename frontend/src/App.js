import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";



function App() {
  const [game, setGame] = useState(new Chess());
  const [highlightSquares, setHighlightSquares] = useState({});

  // Function to handle legal move validation
  const onDrop = (sourceSquare, targetSquare) => {
    try {
      const gameCopy = new Chess(game.fen());

      // Attempt to make the move
      const move = gameCopy.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q", // Always promote to queen when needed
      });

      // If move is invalid, return false to prevent board update
      if (!move) {
        console.log(`❌ Invalid move: ${sourceSquare} to ${targetSquare}`);
        return false;
      }

      // If move is valid, update the game state
      setGame(gameCopy);
      setHighlightSquares({});
      return true;
    } catch (error) {
      console.error("⚠️ Move error:", error.message);
      return false; // Prevents invalid moves from triggering an update
    }
  };

  // Function to highlight legal moves
  const onPieceClick = (square) => {
    const moves = game.moves({ square, verbose: true });

    if (moves.length === 0) return;

    const highlights = {};
    moves.forEach((move) => {
      highlights[move.to] = { background: "rgba(255, 255, 0, 0.5)" };
    });

    setHighlightSquares(highlights);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "20px" }}>
      <h1>Chess Trainer</h1>
      <Chessboard
        position={game.fen()}
        boardWidth={400}
        onPieceDrop={onDrop} // Ensures only valid moves are made
        customSquareStyles={highlightSquares} // Highlights legal moves
        onSquareClick={onPieceClick} // Highlights valid destinations
        arePremovesAllowed={false} // Prevents invalid premoves
      />
    </div>
  );
}

export default App;
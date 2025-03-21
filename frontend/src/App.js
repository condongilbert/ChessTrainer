import React, { useState } from "react";
import { Chess } from "chess.js"; // Handles chess logic
import { Chessboard } from "react-chessboard"; // Named import for the chessboard

function App() {
  const [game] = useState(new Chess()); // Initialize a new chess game

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "20px" }}>
      <h1>Chess Trainer</h1>
      {/* Set boardWidth to adjust size */}
      <Chessboard 
        position={game.fen()} 
        boardWidth={400} // Set the desired width for the chessboard
      />
    </div>
  );
}

export default App;
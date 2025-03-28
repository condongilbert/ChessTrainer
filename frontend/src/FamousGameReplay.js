import React, { useState, useEffect } from "react";
import { Chess } from "chess.js";
import Chessboard from "@chrisoakman/chessboard";

const FamousGamesReplay = ({ gameMoves }) => {
  const [chess] = useState(new Chess());
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);
  const [position, setPosition] = useState("start");

  useEffect(() => {
    if (gameMoves && gameMoves.length > 0) {
      chess.reset();
      setPosition("start");
      setCurrentMoveIndex(0);
    }
  }, [gameMoves, chess]);

  const nextMove = () => {
    if (currentMoveIndex < gameMoves.length) {
      chess.move(gameMoves[currentMoveIndex]);
      setPosition(chess.fen());
      setCurrentMoveIndex(currentMoveIndex + 1);
    }
  };

  const prevMove = () => {
    if (currentMoveIndex > 0) {
      chess.reset();
      for (let i = 0; i < currentMoveIndex - 1; i++) {
        chess.move(gameMoves[i]);
      }
      setPosition(chess.fen());
      setCurrentMoveIndex(currentMoveIndex - 1);
    }
  };

  return (
    <div className="chess-container">
      <h2>Famous Chess Game Replay</h2>
      <Chessboard position={position} draggable={false} />
      <div className="controls">
        <button onClick={prevMove} disabled={currentMoveIndex === 0}>
          Previous
        </button>
        <button onClick={nextMove} disabled={currentMoveIndex >= gameMoves.length}>
          Next
        </button>
      </div>
    </div>
  );
};

export default FamousGamesReplay;
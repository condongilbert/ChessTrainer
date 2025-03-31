import React, { useState, useEffect } from 'react';

function ChessGames() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    // Fetch games from the API
    fetch("http://localhost:5000/lichess_games")
      .then((response) => response.json())
      .then((data) => setGames(data))
      .catch((error) => console.error('Error fetching games:', error));
  }, []);

  return (
    <div>
      <h1>Chess Games</h1>
      {games.length > 0 ? (
        games.map((game) => (
          <div key={game.id}>
            <h2>{game.white_player} vs {game.black_player}</h2>
            <p>Result: {game.result}</p>
            <p>Opening: {game.opening}</p>
            <p>White Rating: {game.white_rating} - Black Rating: {game.black_rating}</p>
            <h3>Moves:</h3>
            <ul>
              {game.moves.map((move, index) => (
                <li key={index}>{move}</li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>No games found.</p>
      )}
    </div>
  );
}

export default ChessGames;
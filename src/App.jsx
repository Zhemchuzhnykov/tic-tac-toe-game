import { useState } from "react";
import Player from "./components/Player/Player.jsx";
import GameBoard from "./components/GameBoard/GameBoard.jsx";
import Log from "./components/Log/Log.jsx";
import GameOver from "./components/GameOver/GameOver.jsx";
import { getWinner, getGameBoard } from "./helpers/helpers.jsx";

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};

function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);

  const gameBoard = getGameBoard(gameTurns);

  const winner = getWinner(gameBoard, players);

  const isDraw = gameTurns.length === 9 && !winner;

  let currentPlayer = "X";

  if (gameTurns[0] && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }

  function handleSelectSquare(rowIndex, columnIndex) {
    setGameTurns((previousTurns) => {
      const updatedTurns = [
        {
          square: { row: rowIndex, column: columnIndex },
          player: currentPlayer,
        },
        ...previousTurns,
      ];

      return updatedTurns;
    });
  }

  function handleGameRestart() {
    setGameTurns(() => []);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers((previousPlayers) => {
      return {
        ...previousPlayers,
        [symbol]: newName,
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name={PLAYERS.X}
            symbol="X"
            isActive={currentPlayer === "X"}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            name={PLAYERS.O}
            symbol="O"
            isActive={currentPlayer === "O"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || isDraw) && (
          <GameOver winner={winner} onRestart={handleGameRestart} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} gameBoard={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;

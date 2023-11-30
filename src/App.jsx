import { useState } from "react";
import Player from "./components/Player/Player.jsx";
import GameBoard from "./components/GameBoard/GameBoard.jsx";
import Log from "./components/Log/Log.jsx";
import GameOver from "./components/GameOver/GameOver.jsx";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function App() {
  const [gameTurns, setGameTurns] = useState([]);

  let gameBoard = [...initialGameBoard.map((nestedArr) => [...nestedArr])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, column } = square;

    gameBoard[row][column] = player;
  }

  let winner = null;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = firstSquareSymbol;
    }
  }

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

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="Player 1" symbol="X" isActive={currentPlayer === "X"} />
          <Player name="Player 2" symbol="O" isActive={currentPlayer === "O"} />
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

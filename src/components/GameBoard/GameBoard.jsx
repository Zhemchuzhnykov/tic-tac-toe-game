import "./GameBoard.css";

export default function GameBoard({ onSelectSquare, gameBoard }) {
  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => {
        return (
          <li key={rowIndex}>
            <ol>
              {row.map((playerSymbol, columnIndex) => {
                return (
                  <li key={columnIndex}>
                    <button
                      onClick={() => onSelectSquare(rowIndex, columnIndex)}
                      disabled={playerSymbol !== null}
                    >
                      {playerSymbol}
                    </button>
                  </li>
                );
              })}
            </ol>
          </li>
        );
      })}
    </ol>
  );
}

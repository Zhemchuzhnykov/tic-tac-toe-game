import "./Log.css";

export default function Log({ turns }) {
  return (
    <ol id="log">
      {turns.map((turn) => (
        <li key={`${turn.square.row}${turn.square.column}`}>
          {turn.player} selected {turn.square.row + 1} row,{" "}
          {turn.square.column + 1} column
        </li>
      ))}
    </ol>
  );
}

import "./Player.css";
import { useState } from "react";

export default function Player({ name, symbol }) {
  const [isEditing, setEditing] = useState(false);
  const [playerName, setPlayerName] = useState(name);

  function updateButtonState() {
    setEditing((isEditing) => !isEditing);
  }

  function updatePlayerName(event) {
    setPlayerName(event.target.value);
  }

  const playerNameEl = <span className="player-name">{playerName}</span>;
  const input = (
    <input
      type="text"
      value={playerName}
      onChange={updatePlayerName}
      required
    ></input>
  );
  let buttonText = "Edit";

  if (isEditing) {
    buttonText = "Save";
  }

  return (
    <li>
      <span className="player">
        {isEditing ? input : playerNameEl}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={updateButtonState}>{buttonText}</button>
    </li>
  );
}

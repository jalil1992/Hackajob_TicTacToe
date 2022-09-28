/* eslint-disable react-hooks/exhaustive-deps*/
import React, { useEffect, useState } from "react";

const Board = () => {
  const [status, setStatus] = useState("");
  const [player, setPlayer] = useState("X");
  const [values, setValues] = useState(Array(9).fill(""));

  const reset = () => {
    setValues(Array(9).fill(""));
  };

  useEffect(
    () => {
      // check winner
      const winnerConditions = [
        [0, 1, 2],
        [0, 3, 6],
        [0, 4, 8],
        [4, 3, 5],
        [4, 1, 7],
        [4, 2, 6],
        [8, 2, 5],
        [8, 6, 7]
      ];
      let won = false;
      for (let i = 0; i < winnerConditions.length; i++) {
        let loc = winnerConditions[i];
        if (
          values[loc[0]] === values[loc[1]] &&
          values[loc[0]] === values[loc[2]] &&
          values[loc[0]] === player
        ) {
          won = true;
          break;
        }
      }

      if (won) {
        setStatus(`Winner: ${player}`);
      } else {
        let markCount = values.filter(x => x !== "").length;
        if (markCount > 5) {
          setStatus("Tie");
        } else {
          let nextPlayer = player === "X" ? "O" : "X";
          if (markCount === 0) {
            nextPlayer = "X";
          }
          setPlayer(nextPlayer);
          setStatus(`Next player: ${nextPlayer}`);
        }
      }
    },
    [values]
  );

  const updateCell = (r, c) => {
    // game ended
    if (status === "Tie" || status.includes("Winner")) return;

    // already occupied
    if (values[r * 3 + c] !== "") return;

    // add new mark
    let _values = values;
    _values[r * 3 + c] = player;
    setValues([..._values]);
  };

  return (
    <div className="game">
      <button className="reset" onClick={reset}>
        Reset
      </button>
      <div className="status">
        {status}
      </div>
      <div className="board">
        {[0, 1, 2].map(r =>
          <div className="row" key={r} style={{ height: "30px" }}>
            {[0, 1, 2].map(c =>
              <span
                className="square"
                key={r * 3 + c}
                style={{
                  width: "30px",
                  verticalAlign: "top",
                  height: "30px",
                  border: "1px solid #000000",
                  display: "inline-block"
                }}
                onClick={e => {
                  updateCell(r, c);
                }}
              >
                {values[3 * r + c]}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Board;

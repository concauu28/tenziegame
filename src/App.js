import React from "react";
import Dice from "./Dice";
import { nanoid } from "nanoid";
function App() {
  const [alldice, setalldice] = React.useState(allDice());
  const diceelement = alldice.map((dice) => (
    <Dice
      key={dice.id}
      value={dice.value}
      isHeld={dice.isHeld}
      handleclick={() => holdDice(dice.id)}
    />
  ));
  const [tenzies, settenzie] = React.useState(false);

  React.useEffect(() => {
    const allHeld = alldice.every((dice) => dice.isHeld);
    const sameValue = alldice.every((dice) => dice.value === alldice[0].value);
    if (allHeld && sameValue) {
      settenzie(true);
      console.log("You won!");
    }
  }, [alldice]);

  function reset() {
    console.log("reset");
    settenzie(false);
    setalldice(allDice());
  }

  function allDice() {
    const listofDice = [];
    for (let i = 0; i < 10; i++) {
      listofDice.unshift({
        value: Math.floor(Math.random() * 6) + 1,
        isHeld: false,
        id: nanoid(),
      });
    }
    return listofDice;
  }

  function generatedice() {
    // setalldice(allDice());
    setalldice((prevdice) =>
      prevdice.map((dice) => {
        return dice.isHeld === true
          ? dice
          : {
              value: Math.floor(Math.random() * 6) + 1,
              isHeld: false,
              id: nanoid(),
            };
      })
    );
  }

  function holdDice(id) {
    setalldice((prevdice) =>
      prevdice.map((dice) => {
        return dice.id === id ? { ...dice, isHeld: !dice.isHeld } : dice;
      })
    );
  }

  return (
    <div className="container">
      <div className="game-container">
        <div className="instruc-container">
          <h1 className="title">Tenzies</h1>
          <p className="instructions">
            Roll until all dice are the same. Click each die to freeze it at its
            current value between rolls.
          </p>
        </div>
        <div className="dice-container">{diceelement}</div>
        <button
          className="dice-button"
          onClick={tenzies === true ? reset : generatedice}
        >
          <h4>{tenzies === true ? "New game" : "Roll"}</h4>
        </button>
      </div>
    </div>
  );
}

export default App;

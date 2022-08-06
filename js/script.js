// gameboard
const gameboard = (() => {
  const gameboardArray = [];
  const container = document.querySelector("#main-container");

  for (let i = 0; i < 9; i++) {
    let div = document.createElement("div");
    container.append(div);
  }
  return { gameboardArray };
})();

// remove side borders
const borders = (() => {
  const container = document.querySelectorAll("#main-container div");
  for (let i = 0; i < 3; i++) {
    container[i].style.borderTop = "none";
    container[0].style.borderLeft = "none";
    container[2].style.borderRight = "none";
  }
  for (let i = 3; i < 6; i++) {
    container[3].style.borderLeft = "none";
    container[5].style.borderRight = "none";
  }
  for (let i = 6; i < 9; i++) {
    container[i].style.borderBottom = "none";
    container[6].style.borderLeft = "none";
    container[8].style.borderRight = "none";
  }
})();

const Player = (name, mark) => {
  const getName = () => name;
  const getMark = () => mark;
  let type;
  const pt = (() => {
    if (this.getName === "AI") {
      type = "AI";
    } else {
      type = "Player";
    }
  })();

  return { getName, getMark, type };
};

const displayController = (xPlayer, oPlayer) => {
  const turnArray = [];
  const container = document.querySelectorAll("#main-container div");
  for (let i = 0; i < container.length; i++) {
    container[i].addEventListener("click", () => {
      if (turnArray.length % 2 == 0) {
        if (gameboard.gameboardArray[i] == undefined) {
          if (xPlayer.type === "Player") {
            container[i].innerHTML = xPlayer.getMark();
            gameboard.gameboardArray[i] = xPlayer.getMark();
            turnArray.push("x");
            checkCombo();
          } else {
            compMove();
            container[compMove.index].innerHTML = xPlayer.getMark();
            gameboard.gameboardArray[compMove.index] = xPlayer.getMark();
            turnArray.push("x");
            checkCombo();
          }
        } else {
          return;
        }
      } else {
        if (gameboard.gameboardArray[i] == undefined) {
          if (xPlayer.type === "Player") {
            container[i].innerHTML = oPlayer.getMark();
            gameboard.gameboardArray[i] = oPlayer.getMark();
            turnArray.push("O");
            checkCombo();
          } else {
            compMove();
            container[compMove.index].innerHTML = oPlayer.getMark();
            gameboard.gameboardArray[compMove.index] = oPlayer.getMark();
            turnArray.push("o");
            checkCombo();
          }
        } else {
          return;
        }
      }
    });
  }

  return { turnArray };
};

const player1 = Player("Jim", "X");
const player2 = Player("AI", "O");
displayController(player1, player2);

const checkCombo = () => {
  const element = gameboard.gameboardArray;
  const xR1 = element[0] === "X" && element[1] === "X" && element[2] === "X";
  const oR1 = element[0] === "O" && element[1] === "O" && element[2] === "O";
  const xR2 = element[3] === "X" && element[4] === "X" && element[5] === "X";
  const oR2 = element[3] === "O" && element[4] === "O" && element[5] === "O";
  const xR3 = element[6] === "X" && element[7] === "X" && element[8] === "X";
  const oR3 = element[6] === "O" && element[7] === "O" && element[8] === "O";
  const xC1 = element[0] === "X" && element[3] === "X" && element[6] === "X";
  const oC1 = element[0] === "O" && element[3] === "O" && element[6] === "O";
  const xC2 = element[1] === "X" && element[4] === "X" && element[7] === "X";
  const oC2 = element[1] === "O" && element[4] === "O" && element[7] === "O";
  const xC3 = element[2] === "X" && element[5] === "X" && element[8] === "X";
  const oC3 = element[2] === "O" && element[5] === "O" && element[8] === "O";
  const xD1 = element[0] === "X" && element[4] === "X" && element[8] === "X";
  const oD1 = element[0] === "O" && element[4] === "O" && element[8] === "O";
  const xD2 = element[2] === "X" && element[4] === "X" && element[6] === "X";
  const oD2 = element[2] === "O" && element[4] === "O" && element[6] === "O";

  if (xR1 === true) console.log(player1.getName() + " wins");
  if (oR1 === true) console.log(player2.getName() + " wins");
  if (xR2 === true) console.log(player1.getName() + " wins");
  if (oR2 === true) console.log(player2.getName() + " wins");
  if (xR3 === true) console.log(player1.getName() + " wins");
  if (oR3 === true) console.log(player2.getName() + " wins");
  if (xC1 === true) console.log(player1.getName() + " wins");
  if (oC1 === true) console.log(player2.getName() + " wins");
  if (xC2 === true) console.log(player1.getName() + " wins");
  if (oC2 === true) console.log(player2.getName() + " wins");
  if (xC3 === true) console.log(player1.getName() + " wins");
  if (oC3 === true) console.log(player2.getName() + " wins");
  if (xD1 === true) console.log(player1.getName() + " wins");
  if (oD1 === true) console.log(player2.getName() + " wins");
  if (xD2 === true) console.log(player1.getName() + " wins");
  if (oD2 === true) console.log(player2.getName() + " wins");

  return gameboard;
};

const compMove = () => {
  let indexArray = [];
  let index;
  indexArray.push(gameboard.gameboardArray.indexOf("X"));

  let x = Math.floor(Math.random() * 9);
  for (let i = 0; i < indexArray.length; i++) {
    if (indexArray[i] !== x) {
      x = Math.floor(Math.random() * 9);
    } else {
      break;
    }
  }

  index = x;
  console.log(index);
  return { index };
};

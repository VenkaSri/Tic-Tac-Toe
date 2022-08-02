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

  return { getName, getMark };
};

const displayController = (xPlayer, oPlayer) => {
  const turnArray = [];
  const container = document.querySelectorAll("#main-container div");
  for (let i = 0; i < container.length; i++) {
    container[i].addEventListener("click", () => {
      if (turnArray.length % 2 == 0) {
        if (gameboard.gameboardArray[i] == undefined) {
          container[i].innerHTML = xPlayer.getMark();
          gameboard.gameboardArray[i] = xPlayer.getMark();
          turnArray.push("x");
          console.log(turnArray.length);
        } else {
          return;
        }
      } else {
        if (gameboard.gameboardArray[i] !== "X") {
          container[i].innerHTML = oPlayer.getMark();
          gameboard.gameboardArray[i] = oPlayer.getMark();
          turnArray.push("O");
          console.log(turnArray.length);
        } else {
          return;
        }
      }
    });
  }

  return {turnArray};
};

displayController(Player("Jim", "X"), Player("Pam", "O"));

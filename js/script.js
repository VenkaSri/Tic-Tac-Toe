let xPlayer = true;
let gameOver = false;
const emptySpotsArray = [];
const takenSpotsArray = [];

const gameboard = (() => {
  const board = [[], [], []];
  const cell = document.querySelectorAll(".cell");
  for (let i = 0; i < cell.length; i++) {
    if (i < 3) board[0].push(cell[i]);
    if (i < 6 && i >= 3) board[1].push(cell[i]);
    if (i < 9 && i >= 6) board[2].push(cell[i]);
  }
  return { board };
})();

const player = (name, type) => {
  const getName = name;
  const getType = type;
  return { getName, getType };
};

const player1 = player("Jim", "Human");
const player2 = player("Pam", "Human");

window.onload = () => {
  const board = gameboard.board;
  placeAIMark();
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      board[i][j].addEventListener(
        "click",
        () => {
          if (xPlayer) {
            if (player1.getType == "Human") {
              board[i][j].innerHTML = "X";
              xPlayer = false;
              placeAIMark();
            } else {
              placeAIMark();
            }
          } else {
            if (board[i][j].innerHTML == "") {
              board[i][j].innerHTML = "O";
              xPlayer = true;
              placeAIMark();
            }
          }
        },
        { once: true }
      );
    }
  }
};

const emptySpots = () => {
  const board = gameboard.board;
  let iPos = 0;
  let jPos = 0;
  emptySpotsArray.length = 0;
  takenSpotsArray.length = 0;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j].innerHTML == "") {
        iPos = i;
        jPos = j;
        emptySpotsArray.push({ iPos, jPos });
      } else {
        iPos = i;
        jPos = j;
        takenSpotsArray.push({ iPos, jPos });
      }
    }
  }
  return {emptySpotsArray, takenSpotsArray};
};

const placeAIMark = () => {
  const board = gameboard.board;
  let pos = randomSpot();
  if (player1.getType !== "Human" && player2.getType !== "Human") {
    if (xPlayer) {
      board[pos[0]][pos[1]].innerHTML = "X";
      xPlayer = false;
    } else {
      board[pos[0]][pos[1]].innerHTML = "O";
      xPlayer = true;
    }
  } 
};

const randomSpot = () => {
  const arr = emptySpots().emptySpotsArray;
  let x = arr[Math.floor(Math.random() * arr.length)];
  let i = x.iPos;
  let j = x.jPos;
  return [i, j];
};

const checkStatus = () => {
  const arr = emptySpots().takenSpotsArray;
  const board = gameboard.board; 
  
  
  const arr1 = [0, 1, 2];
  const checkCol = (currentValue) => {
    if(currentValue === 'X' || currentValue === 'O') {
      return currentValue;
    }
    
    
  }
    


  for (let key of arr1) {
      const markAtCol = [board[key][0].innerHTML, board[key][1].innerHTML, board[key][2].innerHTML];
      if(markAtCol.every(checkCol)) {
        console.log(markAtCol[0]);
      };
      
  }
  
  
  
  
  
  
  
};

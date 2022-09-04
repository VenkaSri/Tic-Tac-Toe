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
const player2 = player("Pam", "AI");

window.onload = () => {
  const board = gameboard.board;
  placeAIMark();
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      board[i][j].addEventListener(
        "click",
        () => {
          if(!gameOver) {
            if (xPlayer) {
              if (player1.getType == "Human") {
                if(board[i][j].innerHTML == "") {
                  board[i][j].innerHTML = "X";
                  xPlayer = false;
                  placeAIMark();
                  checkStatus();
                }
              } else {
                placeAIMark();
                checkStatus();
              }
            } else {
              if (player2.getType == "Human") {
                if(board[i][j].innerHTML == "") {
                  board[i][j].innerHTML = "O";
                  xPlayer = true;
                  placeAIMark();
                  checkStatus();
                }
              } else {
                placeAIMark();
                checkStatus();
              }
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
  if (player1.getType == "Human" && player2.getType == "Human") return;
  if (player1.getType == "AI") {
    if (xPlayer) {
      board[pos[0]][pos[1]].innerHTML = "X";
      xPlayer = false;
    }
  } 
  if (!xPlayer) {
    const emptSpotsArr = emptySpots().emptySpotsArray;
    if (emptSpotsArr.length > 1) {
      if (player2.getType == "AI") {
        board[pos[0]][pos[1]].innerHTML = "O";
        xPlayer = true;
      }
    } 
  } 
};

const randomSpot = () => {
  const arr = emptySpots().emptySpotsArray;
  if (arr.length > 1) {
    let x = arr[Math.floor(Math.random() * arr.length)];
  let i;
  let j;
    i = x.iPos;
    j = x.jPos;
  
  return [i, j];
  }
  return;
};

const checkStatus = () => {
  const board = gameboard.board; 
  const arr1 = [0, 1, 2];
  const comboArr = [];
  const markAtLeftDia = [board[0][0].innerHTML, board[1][1].innerHTML, board[2][2].innerHTML];
  const markAtRightDia = [board[0][2].innerHTML, board[1][1].innerHTML, board[2][0].innerHTML];

  comboArr.push(markAtLeftDia, markAtRightDia);
  for (let key of arr1) {
    const markAtRow = [board[key][0].innerHTML, board[key][1].innerHTML, board[key][2].innerHTML];
    const markAtCol = [board[0][key].innerHTML, board[1][key].innerHTML, board[2][key].innerHTML];
    comboArr.push(markAtRow, markAtCol);
  }; 
  

  checkMark(comboArr);
}

const checkMark = arr => {
  const checkX = (currentValue) => currentValue === 'X';
  const checkO = (currentValue) => currentValue === 'O';
  
  for(let i = 0; i < arr.length; i++) {
    if(arr[i].every(checkX)) {
      console.log(arr[i][0]);
      gameOver = true;
    } else if(arr[i].every(checkO)) {
      console.log(arr[i][0]);
      gameOver = true;
    }
  }
}
  
  
  
  
  
  
  


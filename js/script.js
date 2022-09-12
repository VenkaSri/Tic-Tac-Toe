let xPlayer = true;
let gameOver = false;
let xWinner = false;
let oWinner = false;;
let noWinner = false;
let firstMove = true;

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

const player1 = player("Jim", "AI");
const player2 = player("Pam", "Human");

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
                  checkStatus();
                  xPlayer = false;
                  placeAIMark();
                }
              } else {
                
              }
            } else {
              if (player2.getType == "Human") {
                if(board[i][j].innerHTML == "") {
                  board[i][j].innerHTML = "O";
                  checkStatus();
                  xPlayer = true;
                  placeAIMark();
                }
              } 
            }
          }
        },
        { once: true }
      );
    }
  }
};

const placeAIMark = () => {
  if (firstMove && player1.getType == 'AI') {
    let randNum = Math.floor(Math.random() * 9);
    find2DSpot(randNum);
    xPlayer = false;
    firstMove = false;
  } else if (player1.getType == 'AI') {
    const currBoardState = board();
    const bestPlayInfo = minimax(currBoardState, aiMark);
    find2DSpot(bestPlayInfo.index)
    checkStatus();
    xPlayer = false;
  }

};




const find2DSpot = (index) => {
  const board = gameboard.board;
  console.log(index);
  if (index < 3) board[0][index].innerHTML = aiMark;
  switch (index) {
    case 3:
      board[1][0].innerHTML = aiMark;
      break;
    case 4:
      board[1][1].innerHTML = aiMark;
      break;
    case 5:
      board[1][2].innerHTML = aiMark;
      break;
    case 6:
      board[2][0].innerHTML = aiMark;
      break;
    case 7:
      board[2][1].innerHTML = aiMark;
      break;
    case 8:
      board[2][2].innerHTML = aiMark;
      break;
  }
}

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

  const emptySpots = getAllEmptyCellsIndexes(board());
  if (emptySpots.length == 0 && gameOver == false) {
    console.log("Tie game");
  }
}


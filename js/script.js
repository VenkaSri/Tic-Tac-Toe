let xPlayer = true;
let gameOver = false;
let xWinner = false;
let oWinner = false;;
let noWinner = false;
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
          if(!gameOver) {
            if (xPlayer) {
              if (player1.getType == "Human") {
                if(board[i][j].innerHTML == "") {
                  board[i][j].innerHTML = "X";
                  xPlayer = false;
                  placeAIMark();
                }
              } else {
                placeAIMark();
              }
            } else {
              if (player2.getType == "Human") {
                if(board[i][j].innerHTML == "") {
                  board[i][j].innerHTML = "O";
                  xPlayer = true;
                  placeAIMark();
                }
              } else {
                placeAIMark();
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
  
  if (player1.getType == "Human" && player2.getType == "Human") return;
  if (!gameOver) {
    let pos = randomSpot();
    if (player1.getType == "AI") {
      if (xPlayer) {
        board[pos[0]][pos[1]].innerHTML = "X";
        checkStatus();
        xPlayer = false;
      }
    } 
    if (!xPlayer) {
      const emptSpotsArr = emptySpots().emptySpotsArray;
      if (emptSpotsArr.length > 1) {
        if (player2.getType == "AI") {
          board[pos[0]][pos[1]].innerHTML = "O";
          checkStatus();
          xPlayer = true;
        }
      } 
    }
  }
   
};

const randomSpot = () => {
  const arr = emptySpots().emptySpotsArray;

  let x = arr[Math.floor(Math.random() * arr.length)];
  let i;
  let j;
    i = x.iPos;
    j = x.jPos;
  
  return [i, j];
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
      xWinner = true;
      gameOver = true;
    } else if(arr[i].every(checkO)) {
      oWinner = true;
      gameOver = true;
    }
  }

  const emptSpotsArr = emptySpots().emptySpotsArray;
  if (emptSpotsArr.length == 0 && gameOver == false) {
    noWinner = true;
    console.log("Tie game");
  }
}

const checkWinnerFound = (board, currMark) => {

      if (
        (board[0][0] == currMark && board[0][1] == currMark && board[0][2] == currMark) ||
        (board[1][0] == currMark && board[1][1] == currMark && board[1][2] == currMark) ||
        (board[2][0] == currMark && board[2][1] == currMark && board[2][2] == currMark) ||
        (board[0][0] == currMark && board[1][0] == currMark && board[2][0] == currMark) ||
        (board[0][1] == currMark && board[1][1] == currMark && board[2][1] == currMark) ||
        (board[0][2] == currMark && board[1][2] == currMark && board[2][2] == currMark) ||
        (board[0][0] == currMark && board[1][1] == currMark && board[2][2] == currMark) ||
        (board[0][2] == currMark && board[1][1] == currMark && board[2][0] == currMark) 
      ) {
        return true;
      } else {
        return false;
      }
};


  
const aiMark = "X";
const humanMark = "O";
  



const aI = (currBdSt, currMark) => {
  
  let em = emptySpots().emptySpotsArray;
  // console.log(board);

  if (checkWinnerFound(currBdSt, humanMark)) {
    return -1;
  } 
  else if (checkWinnerFound(currBdSt, aiMark)) {
    return {score: 1};
  } else if (em.length === 0) {
    return {score: 0};
  }


  const allTestPlayInfos = [];


  for (let i = 0; i < em.length; i++) {
    const currentTestPlayInfo = {};

    gameboard.board[em[i].iPos][em[i].jPos].innerHTML = currMark;

    if (currMark === aiMark) {
      const res = aI(currentBoardState(), humanMark);
      currentTestPlayInfo.score = res;
    }




    gameboard.board[em[i].iPos][em[i].jPos].innerHTML = "";

    allTestPlayInfos.push(currentTestPlayInfo);
    
  }

  console.log(allTestPlayInfos);
    
  }



  

  



 

  
  
  
    

    
    








  






const currentBoardState = () => {
  const board = gameboard.board;
  const currBdSt = [[{iPos: 0, jPos: 0}, {iPos: 0, jPos: 1}, {iPos: 0, jPos: 2}],
                    [{iPos: 1, jPos: 0}, {iPos: 1, jPos: 1}, {iPos: 1, jPos: 2}],
                    [{iPos: 2, jPos: 0}, {iPos: 2, jPos: 1}, {iPos: 2, jPos: 2}]];
for (let i = 0; i < currBdSt.length; i++) {
    for (let j = 0; j < currBdSt[i].length; j++) {
      if (board[currBdSt[i][j].iPos][currBdSt[i][j].jPos].innerHTML !== "") {
        currBdSt[i][j] = board[currBdSt[i][j].iPos][currBdSt[i][j].jPos].innerHTML;
      }
    }
  }

  return currBdSt;
}


function getAllEmptyCellsIndexes(currBdSt) {

  let filteredArray = [];

  for (let i = 0; i < currBdSt.length; i++) {
    filteredArray.push(currBdSt[i].filter(i => i != "O" && i != "X"));
  }

  return filteredArray;

}


const testFunction = (currBdSt) => {

  console.log(currBdSt)


  let availCellsIndexes = emptySpots().emptySpotsArray;

  for (let i = 0; i < availCellsIndexes.length; i++) {
  
    const currentTestPlayInfo = {};
    currentTestPlayInfo.index = currBdSt[availCellsIndexes[i].iPos][availCellsIndexes[i].jPos];
    currBdSt[availCellsIndexes[i].iPos][availCellsIndexes[i].jPos] = "X";
    currBdSt[availCellsIndexes[i].iPos][availCellsIndexes[i].jPos] = currentTestPlayInfo.index;
}

}


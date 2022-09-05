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
                  checkStatus();
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
                  checkStatus();
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

const checkWinneFound = (currMark) => {
  const board = gameboard.board;
  for (let i = 0; i < board[1].length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      console.log(board[i][j].innerHTML);
      if (
        (board[i][j].innerHTML == currMark && board[i][j + 1].innerHTML == currMark && board[i][j + 2].innerHTML == currMark) || 
      // check row
      (board[i][0 + i].innerHTML == currMark && board[1][0 + i].innerHTML == currMark && board[2][0 + i].innerHTML == currMark) ||
      //check diagonal
      (board[0][2].innerHTML == currMark && board[1][1].innerHTML == currMark && board[2][0].innerHTML == currMark) ||
      (board[0][0].innerHTML == currMark && board[1][1].innerHTML == currMark && board[2][2].innerHTML == currMark)
      ) {
        return true;
      } else {
        return false;
      }
    }
  }
};


  
const aiMark = "X";
const humanMark = "O";
  
function minimax(currBdSt, currMark) { 

  const availCellsIndexes = emptySpots().emptySpotsArray;
  const allTestPlayInfos = [];
  checkStatus();
  if (oWinner) {
    return {score: -1};
} else if (xWinner) {
    return {score: 1};
} else if (noWinner) {
    return {score: 0};
}


  for (let i = 0; i < availCellsIndexes.length; i++) {
    const currentTestPlayInfo = {};
    currentTestPlayInfo.index = availCellsIndexes[i];


    for (let j = 0; j < currBdSt.length; j++) {
      if(currBdSt[j].iPos === currentTestPlayInfo.index.iPos && currBdSt[j].jPos === currentTestPlayInfo.index.jPos) {
        currBdSt[j] = currMark;
        
      }
    }


    if (currMark === aiMark) {
      const result = minimax(currBdSt, humanMark);
      currentTestPlayInfo.score = result.score;
  } else {
      const result = minimax(currBdSt, aiMark);
      currentTestPlayInfo.score = result.score;
  }


  board[availCellsIndexes[i].iPos][availCellsIndexes[i].jPos] = currentTestPlayInfo.index;
  allTestPlayInfos.push(currentTestPlayInfo);
  }

  let bestTestPlay = null;
    
    // Step 16 - Get the reference to the current player’s best test-play:
    if (currMark === aiMark) {
        let bestScore = -Infinity;
        for (let i = 0; i < allTestPlayInfos.length; i++) {
            if (allTestPlayInfos[i].score > bestScore) {
                bestScore = allTestPlayInfos[i].score;
                bestTestPlay = i;
            }
        }
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < allTestPlayInfos.length; i++) {
            if (allTestPlayInfos[i].score < bestScore) {
                bestScore = allTestPlayInfos[i].score;
                bestTestPlay = i;
            }
        }
    }
    
    // Step 17 - Get the object with the best test-play score for the current player:
    return allTestPlayInfos[bestTestPlay]


}

const aI = (\currMark) => {
  const availCellsIndexes = emptySpots().emptySpotsArray;
  const allTestPlayInfos = [];
  
  if (checkWinneFound(humanMark)) {
    return {score: -1};
} else if (checkWinneFound(aiMark)) {
    return {score: 1};
} else if (availCellsIndexes.length === 0) {
    return {score: 0};
}


  for (let i = 0; i < availCellsIndexes.length; i++) {
    const currentTestPlayInfo = {};
    currentTestPlayInfo.index = availCellsIndexes[i];

    
    for (let j = 0; j < currBdSt.length; j++) {
      if(currBdSt[j].iPos === currentTestPlayInfo.index.iPos && currBdSt[j].jPos === currentTestPlayInfo.index.jPos) {
        currBdSt[j] = currMark;
        console.log(currBdSt[j])
      }
    }

    if ( currMark === aiMark) {
      const result = aI(currBdSt, humanMark);
      currentTestPlayInfo.score = result.score;
      console.log(result);
  } else {
      const result = aI(currBdSt, aiMark);
      currentTestPlayInfo.score = result.score;
      console.log(result);
  }



  }



    
}



  

const currentBoard = () => {
  const board = gameboard.board;
  let iPos = 0;
  let jPos = 0;
  const currBdSt = [];
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      iPos = i;
      jPos = j;
      currBdSt.push({ iPos, jPos });
    }
  }
  return currBdSt;
}
const currBdSt = currentBoard();

  
const bestPlayInfo = aI(currBdSt, aiMark);
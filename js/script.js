const gameboard = (() => {
  const board = [
    ["<div></div>", "<div></div>", "<div></div>"],
    ["<div></div>", "<div></div>", "<div></div>"],
    ["<div></div>", "<div></div>", "<div></div>"]];
  return {board}
})();

const displayBoard = (() => {
  const board = gameboard.board;
  const mainContainer = document.getElementById('main-container');
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      mainContainer.innerHTML += board[i][j];
    }
  }
  return {mainContainer}
})();


const player = (name, mark) => {
  const getName = () => name;
  const getMark = () => mark;
  return {getName, getMark}
}

const turnArray = [];
const placeMark = (mark, pos) => {
  const arr = displayBoard.mainContainer.childNodes;
  if(arr[pos].innerHTML === "") {
    arr[pos].innerHTML = mark;
    turnArray.push(pos);
    pushToBoard(pos, mark);
  }
};

const aiMark = () => {
  placeMark(player2.getMark(), randomNumber());
};


const gameFlow = () => {
  if (turnArray.length % 2 == 0) {
    if(player1.getName() != 'AI') {
      placeMark(player1.getMark(), pos);
      checkWinner();
    } else {
      aiMark();
    }
  } else {
    if(player2.getName() != 'AI') {
      placeMark(player2.getMark(), pos);
      checkWinner();
    } else {
      aiMark();
    }
  }
};

const arrPos = pos => pos;


const checkWinner = () => {
  const board = gameboard.board;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      // check column
      if(board[i][j] == 'x' && board[i][j + 1] == 'x' && board[i][j + 2] == 'x') console.log(player1.getName() + ' is the winner');
      if(board[i][j] == 'o' && board[i][j + 1] == 'o' && board[i][j + 2] == 'o') console.log(player2.getName() + ' is the winner');
      // check row
      if(board[0][0 + i] == 'x' && board[1][0 + i] == 'x' && board[2][0 + i] == 'x') console.log(player1.getName() + ' is the winner');
      if(board[0][0 + i] == 'o' && board[1][0 + i] == 'o' && board[2][0 + i] == 'o') console.log(player2.getName() + ' is the winner');
      //check diagonal
      if(board[0][2] == 'x' && board[1][1] == 'x' && board[2][0] == 'x') console.log(player1.getName() + ' is the winner');
      if(board[0][0] == 'x' && board[1][1] == 'x' && board[2][2] == 'x') console.log(player1.getName() + ' is the winner');
      if(board[0][2] == 'o' && board[1][1] == 'o' && board[2][0] == 'o') console.log(player2.getName() + ' is the winner');
      if(board[0][0] == 'o' && board[1][1] == 'o' && board[2][2] == 'o') console.log(player2.getName() + ' is the winner');
    }
  }
  gameFlow();
};

const randomNumber = () => {
  
  let num = Math.floor(Math.random() * 10);
  for (let takenPos of turnArray) {
    if (takenPos == num) {
      num = Math.floor(Math.random() * 10);
      console.log(num);
      return num;
    } 
  }
  console.log(num);
  return num;
}

const pushToBoard = (pos, mark) => {
  if(pos == 1 || pos == 2 || pos == 3) {
    gameboard.board[0][pos - 1] = mark;
  }
  if(pos == 4 || pos == 5 || pos == 6) {
    gameboard.board[1][pos - 4] = mark;
  }
  if(pos == 7 || pos == 8 || pos == 9) {
    gameboard.board[2][pos - 7] = mark;
  }
}

const player1 = player('Jim', 'x');
  const player2 = player('AI', 'o');
  let pos;
window.onload = () => {
  
  const arr = displayBoard.mainContainer.childNodes;
  for (let i = 0; i < arr.length; i++) {
    arr[i].addEventListener('click', () => {
      pos = i;
      gameFlow();
    })
  }
};
















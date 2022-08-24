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
    turnArray.push(mark);
    pushToBoard(pos, mark);
  }

};

const player1 = player('Jim', 'x');
const player2 = player('Pam', 'o');

const gameFlow = (pos) => {
  if (turnArray.length % 2 == 0) {
    placeMark(player1.getMark(), pos);
    checkWinner();
  } else {
    placeMark(player2.getMark(), pos);
    checkWinner();
  }
};

const checkWinner = () => {
  const board = gameboard.board;
  for (let i = 0; i < board[1].length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if(board[0][0] === 'x' && board[0][1] === 'x' && board[0][2] === 'x') console.log(player1.getName() + ' is the winner');
      if(board[1][0] === 'x' && board[1][1] === 'x' && board[1][2] === 'x') console.log(player1.getName() + ' is the winner');
      if(board[2][0] === 'x' && board[2][1] === 'x' && board[2][2] === 'x') console.log(player1.getName() + ' is the winner');
      if(board[0][0] === 'x' && board[0][1] === 'x' && board[0][2] === 'x') console.log(player1.getName() + ' is the winner');
      if(board[1][0] === 'x' && board[1][1] === 'x' && board[1][2] === 'x') console.log(player1.getName() + ' is the winner');
      if(board[2][0] === 'x' && board[2][1] === 'x' && board[2][2] === 'x') console.log(player1.getName() + ' is the winner');
    }
  }
};

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

window.onload = () => {
  const arr = displayBoard.mainContainer.childNodes;
  for (let i = 0; i < arr.length; i++) {
    arr[i].addEventListener('click', () => {
      gameFlow(i);
    })
  }
};











let xPlayer = true;
let pos = 0;
let gameOver = true;
const gameboard = (() => {
  const  board = [[],[],[]];
  return {board};
})();

const player = (name, mark) => {
  const getName = () => name;
  const getMark = () => mark;
  return {getName, getMark}
}


const player1 = player('Jim', 'x');
const player2 = player('Pam', 'o');

const placeMark = (mark) => {
    for (let i = 0; i < arr.length; i++) {
      arr[i].addEventListener('click', () => {
        if(arr[i].innerHTML !== mark) {
          arr[i].innerHTML = mark;
          turnArray.push(mark);
          gameFlow();
        }  
      })
    }
  };

window.onload = () => {
  const cells = document.querySelectorAll('.cell');
  for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click', () => {
      pos = i;
      if (gameOver) {
        gameFlow();
      }
      
    }, {once: true});
  }
}

const getPosition = (pos) => {
  if (pos >= 0 && pos < 3) {
    let iPos = 0;
    let jPos = pos;
    return {iPos, jPos};
  } else if (pos >= 3  && pos < 6) {
    let iPos = 1;
    let jPos = pos - 3;
    return {iPos, jPos};
  } else if (pos >= 6  && pos < 9) {
    let iPos = 1;
    let jPos = pos - 6;
    return {iPos, jPos};
  } else {
    return null;
  }
}


const gameFlow = () => {
  if(xPlayer) {
    gameboard.board[getPosition(pos).iPos][getPosition(pos).jPos] = "x";
    xPlayer = false;
    displayController(pos, player1.getMark());
  } else {
    gameboard.board[getPosition(pos).iPos][getPosition(pos).jPos] = "o";
    xPlayer = true;
    displayController(pos, player2.getMark());
  }
}

const displayController = (pos, mark) => {
  const cell = document.querySelectorAll('.cell');
  for (let i = 0; i < cell.length; i++) {
      cell[pos].innerHTML = mark;
  }
}






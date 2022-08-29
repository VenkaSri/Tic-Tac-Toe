let pos;
let diffNum = false;
const gameboard = (() => {
  const board = [
    ["x", "x", "x"],
    ["o", "o", "o"],
    ["x", "x", "x"]];
  return {board}
})();

const displayBoard = (() => { 
  const mainContainer = document.getElementById('main-container'); 
  const board = gameboard.board;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      mainContainer.innerHTML += board[i][j];
    }
  }
}
)();




















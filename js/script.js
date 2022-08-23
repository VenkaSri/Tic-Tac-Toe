const gameboard = (() => {
  const board = [
    ["<span>x</span>", "<span>o</span>", "<span>x</span>"],
    ["<span>o</span>", "<span>x</span>", "<span>o</span>"],
    ["<span>x</span>", "<span>o</span>", "<span>x</span>"]];
  const mainContainer = document.getElementById('main-container');
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      mainContainer.innerHTML += board[i][j];
    }
      mainContainer.innerHTML += '<br>'
    }
  return {board, mainContainer}
})();

const player = (name, mark) => {
  const getName = () => name;
  const getMark = () => mark;
  return {getName, getMark}
}

const turnArray = [];
const placeMark = (mark) => {
  const arr = gameboard.mainContainer.childNodes;
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

const player1 = player('Jim', 'x');
const player2 = player('Pam', 'o');

const gameFlow = () => {
  if (turnArray.length % 2 == 0) {
    placeMark(player1.getMark());
    
  } else {
    placeMark(player2.getMark());
  }
};

gameFlow();










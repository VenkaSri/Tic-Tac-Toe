const container = document.querySelector('#main-container');
const playButton = document.querySelector('#play-button');

const gameboard = (() => {

    const boardarray = [];
    
    for(let i = 0; i < 9; i++) {
        let div = document.createElement('div');
        div.innerHTML = " ";
        boardarray.push(div);
    }
    
    return {boardarray};
    
})();


// playButton.addEventListener("click", () => {
// for(let key in gameboard.boardarray) {
//     container.append(gameboard.boardarray[key])
// }
// })

const borders = (() => {

    for(let i = 0; i < 3; i++)  {
        gameboard.boardarray[i].style.borderTop = 'none';
        gameboard.boardarray[0].style.borderLeft = 'none';
        gameboard.boardarray[2].style.borderRight = 'none';
    }
    for(let i = 3; i < 6; i++)  {
        gameboard.boardarray[3].style.borderLeft = 'none';
        gameboard.boardarray[5].style.borderRight = 'none';
    }
    for(let i = 6; i < 9; i++)  {
        gameboard.boardarray[i].style.borderBottom = 'none';
        gameboard.boardarray[6].style.borderLeft = 'none';
        gameboard.boardarray[8].style.borderRight = 'none';
    }
  
})();

const player = () => {
    
    const board = document.querySelectorAll('#main-container div');

    // for(let i in board) {
    //     console.log(board[i]);
    // }
    for (let i = 0; i < board.length; i++) {
        board[i].addEventListener('click', () => {
            board[i].innerHTML = 'X';
        })
    }
    
};






for(let key in gameboard.boardarray) {
    container.append(gameboard.boardarray[key])
}
player();






const container = document.querySelector('#main-container');
const playButton = document.querySelector('#play-button');

// gameboard
const gameboard = (() => {

    const boardarray = [];
    
    for(let i = 0; i < 9; i++) {
        let div = document.createElement('div');
        div.innerHTML = " ";
        boardarray.push(div);
    }
    
    return {boardarray};
    
})();

// remove side borders
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


const Player = (name, symbol) => {
    const getName = () => name;
    const getSymbol = () => symbol;

    
    return {getName, getSymbol} 
};




const gameController = () => {
    let arrayposition = [];

    while(arrayposition != 8) {
        arrayposition.push(jack.pos);
        
    }

    return{arrayposition}
}



const displayController = (xPlayer, oPlayer) => {
    let arrPos = [];
    let curr = xPlayer;

    let board = document.querySelectorAll("#main-container div");
        for (let i = 0; i < board.length; i++) {
            board[i].addEventListener('click', () => {
                board[i].innerHTML = xPlayer.getSymbol();
            })
        }
  
    
    
    return {arrPos};
    
};





for(let key in gameboard.boardarray) {
    container.append(gameboard.boardarray[key])
}







displayController(Player("jack", 'x'), Player('rose', "x"));
const allTestPlayInfos = [];
const aiMark = "X";
const humanMark = "O";

const board= () => {
  const currentBoardState = [0,1,2,3,4,5,6,7,8];
  const cells = document.querySelectorAll('.cell');

  for (let i = 0; i < cells.length; i++) {
    if (cells[i].innerHTML !== "") {
      currentBoardState[i] = cells[i].innerHTML;
    }
  }
 return currentBoardState;
}

function terminalState(currentBoardState, currMark) {
  return (
      (currentBoardState[0] === currMark && currentBoardState[1] === currMark && currentBoardState[2] === currMark) ||
      (currentBoardState[3] === currMark && currentBoardState[4] === currMark && currentBoardState[5] === currMark) ||
      (currentBoardState[6] === currMark && currentBoardState[7] === currMark && currentBoardState[8] === currMark) ||
      (currentBoardState[0] === currMark && currentBoardState[3] === currMark && currentBoardState[6] === currMark) ||
      (currentBoardState[1] === currMark && currentBoardState[4] === currMark && currentBoardState[7] === currMark) ||
      (currentBoardState[2] === currMark && currentBoardState[5] === currMark && currentBoardState[8] === currMark) ||
      (currentBoardState[0] === currMark && currentBoardState[4] === currMark && currentBoardState[8] === currMark) ||
      (currentBoardState[2] === currMark && currentBoardState[4] === currMark && currentBoardState[6] === currMark)
  ) ? true : false;
}

const minimax = (currentBoardState, currMark) => {
  
  const emptySpots = currentBoardState.filter(i => i != "O" && i != "X");
  
  if (terminalState(currentBoardState, humanMark)) {
      return {score: -1};
  } else if (terminalState(currentBoardState, aiMark)) {
      return {score: 1};
  } else if (emptySpots.length === 0) {
      return {score: 0};
  }
  for (let i = 0; i < emptySpots.length; i++) {
      const currentTestPlayInfo = {};

      currentTestPlayInfo.index = currentBoardState[emptySpots[i]];
      currentBoardState[emptySpots[i]] = currMark;
      if (currMark === aiMark) {
          const result = minimax(currentBoardState, humanMark);
          currentTestPlayInfo.score = result.score;
      } else {
          const result = minimax(currentBoardState, aiMark);
          currentTestPlayInfo.score = result.score;
      }
      currentBoardState[emptySpots[i]] = currentTestPlayInfo.index;
      allTestPlayInfos.push(currentTestPlayInfo);
  }
  
  let bestTestPlay = null;
  
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
  
  return allTestPlayInfos[bestTestPlay].index;
} 


const selectPVP = document.querySelector('.pvp');
const wrapper = document.querySelector('.wrapper');
const selectPVAI = document.querySelector('.pvai');
const players = document.querySelectorAll('.player');
const aplayers = document.querySelectorAll('.aplayer');
const inputs = document.querySelectorAll('.pvp input');
const ainputs = document.querySelectorAll('.pvai input');
const pvpOptions = document.querySelectorAll('.pvp select');
const pvaiOptions = document.querySelectorAll('.pvai select');
const playBtn = document.querySelector('.playBtn');
let playerOneName;
let playerTwoName;
let playerOneMark;
let playerTwoMark;


let pvpMode;
let pvaiMode;

const togglePVP = () => {
  if (pvpMode) {
    players.forEach(i => i.classList.add('hide'));
    inputs.forEach(i => i.classList.remove('hide'));
    pvpOptions.forEach(i => i.classList.remove('hide'));
  } else {
    players.forEach(i => i.classList.remove('hide'));
    inputs.forEach(i => i.classList.add('hide'));
    pvpOptions.forEach(i => i.classList.add('hide'));
  }
}

const togglePVAI = () => {
  if (pvaiMode) {
    aplayers.forEach(i => i.classList.add('hide'));
    ainputs.forEach(i => i.classList.remove('hide'));
    pvaiOptions.forEach(i => i.classList.remove('hide'));
  } else {
    aplayers.forEach(i => i.classList.remove('hide'));
    ainputs.forEach(i => i.classList.add('hide'));
    pvaiOptions.forEach(i => i.classList.add('hide'));
  }
}

wrapper.onclick = function(e) {
  let targetName = e.target.className;

  if (targetName == 'pvp') {
    pvpMode = true;
    pvaiMode = false;
    togglePVAI();
    togglePVP();
  } else if (targetName == 'pvai') {
    pvpMode = false;
    pvaiMode = true;
    togglePVAI();
    togglePVP();
  }
}

function getPVPInputs() {
  inputFieldValidations();
  selectValidations();
}

function getPVAIPInputs() {
  const userInput = document.querySelector('.pvp1').value;
  console.log(userInput);
  const userMark = document.querySelector('.pvps1').value;
  console.log(userMark);
}


playBtn.addEventListener('click', () => {
  getPVPInputs();
})

function inputFieldValidations() {
  const playerOneInput = document.querySelector('.pvp1');
  const playerTwoInput = document.querySelector('.pvp2');
  if(playerOneInput != ""  && playerTwoInput != "") {
    playerOneName = playerOneInput.value;
    playerTwoName = playerTwoInput.value;
  } else {
    errorMessage("Fields are empty!");
  }
}

function selectValidations() {
  const playerOneOption = document.querySelector('.pvps1').value;
  const playerTwoOption = document.querySelector('.pvps2').value;
  if(playerOneOption !== playerTwoOption) {
    playerOneMark = playerOneOption;
    playerTwoName = playerTwoOption;
  } else {
    errorMessage("Marks cannot be the same!");
  }
}

function errorMessage(message) {
  const error = document.querySelector('.errorMsg');
  error.innerHTML = message;
}

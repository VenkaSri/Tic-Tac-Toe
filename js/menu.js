const selectPVP = document.querySelector('.pvp');
const selectPVAI = document.querySelector('.pvai');
const players = document.querySelectorAll('.player');
const aplayers = document.querySelectorAll('.aplayer');
const inputs = document.querySelectorAll('.pvp input');
const ainputs = document.querySelectorAll('.pvai input');

let pvpMode = true;
let pvaiMode = true;

const togglePVP = () => {
  if (pvpMode) {
    players.forEach(i => i.classList.add('hide'));
    inputs.forEach(i => i.classList.remove('hide'));
  } else {
    players.forEach(i => i.classList.remove('hide'));
    inputs.forEach(i => i.classList.add('hide'));
  }
}

const togglePVAI = () => {
  if (pvaiMode) {
    aplayers.forEach(i => i.classList.add('hide'));
    ainputs.forEach(i => i.classList.remove('hide'));
  } else {
    aplayers.forEach(i => i.classList.remove('hide'));
    ainputs.forEach(i => i.classList.add('hide'));
  }
}

selectPVP.addEventListener('click', () => {
  pvpMode = true;
  pvaiMode = false;
  togglePVAI();
  togglePVP();
});

selectPVAI.addEventListener('click', () => {
  pvpMode = false;
  pvaiMode = true;
  togglePVP();
  togglePVAI();
});
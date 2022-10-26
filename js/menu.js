const selectPVP = document.querySelector('.pvp');
const wrapper = document.querySelector('.wrapper');
const selectPVAI = document.querySelector('.pvai');
const players = document.querySelectorAll('.player');
const aplayers = document.querySelectorAll('.aplayer');
const inputs = document.querySelectorAll('.pvp input');
const ainputs = document.querySelectorAll('.pvai input');
const options = document.querySelector('select');

let pvpMode;
let pvaiMode;

const togglePVP = () => {
  if (pvpMode) {
    players.forEach(i => i.classList.add('hide'));
    inputs.forEach(i => i.classList.remove('hide'));
    options.classList.remove('hide');
  } else {
    players.forEach(i => i.classList.remove('hide'));
    inputs.forEach(i => i.classList.add('hide'));
    options.classList.add('hide');
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

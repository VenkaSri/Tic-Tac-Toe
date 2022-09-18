const selectMode = document.querySelector('.pvp');
const players = document.querySelectorAll('.player');
const inputs = document.querySelectorAll('.pvp input');

selectMode.addEventListener('click', (e) => {
  players.forEach(i => i.classList.add('hide'));
  inputs.forEach(i => i.classList.remove('hide'));
})
import './index.scss';
import senseiWalk from './assets/Female-1-Walk.png';
import terrainAtlas from './assets/terrain.png';
import ClientGame from './client/ClientGame';

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const terrain = document.createElement('img');
terrain.src = terrainAtlas;

const startGameForm = document.querySelector('.start-game');
const nameInput = document.getElementById('name');
const startGameButton = document.getElementById('btn');

const spriteW = 48;
const spriteH = 48;
const shots = 3; // each direction has 3 different images which should be changed while figure moves
const step = 10;
let cycle = 0; // is calculated based on shots
let direction = 0; // is calculated based on which button was pressed
let isPressed = false;
let pY = canvas.height / 2 - spriteH / 2; // y coordinate of figure position
let pX = canvas.width / 2 - spriteW / 2; // x coordinate of figure position
let buttonPressed = null; // describes which button is pressed (bottom, left), right, top)
const spriteDirection = {
  bottom: 0,
  left: 1,
  right: 2,
  top: 3,
};

// describes behavior when user presses button
function keyDownHandler(e) {
  isPressed = true;
  buttonPressed = e.key;
}

// describes behavior when user stops pressing button
function keyUpHandler() {
  isPressed = false;
  buttonPressed = null;
}

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

const img = document.createElement('img');
img.src = senseiWalk;

function walk() {
  if (isPressed) {
    cycle = (cycle + 1) % shots;
    switch (buttonPressed) {
      case 'Down':
      case 'ArrowDown':
        pY += step;
        if (pY > canvas.height - spriteW) {
          pY = canvas.height - spriteW;
        }
        direction = spriteDirection.bottom * spriteH;
        break;
      case 'Left':
      case 'ArrowLeft':
        pX -= step;
        if (pX < 0) {
          pX = 0;
        }
        direction = spriteDirection.left * spriteH;
        break;
      case 'Right':
      case 'ArrowRight':
        pX += step;
        if (pX > canvas.width - spriteH) {
          pX = canvas.width - spriteH;
        }
        direction = spriteDirection.right * spriteH;
        break;
      case 'Up':
      case 'ArrowUp':
        pY -= step;
        if (pY < 0) {
          pY = 0;
        }
        direction = spriteDirection.top * spriteH;
        break;
      default:
        console.log('Pressed button is not found');
    }
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // drawBackground();
  ctx.drawImage(img, cycle * spriteW, direction, spriteW, spriteH, pX, pY, spriteW, spriteH);

  window.requestAnimationFrame(walk);
}

function initGame(e) {
  e.preventDefault();
  startGameForm.style.display = 'none';
  ClientGame.init({ tagId: 'game', playerName: nameInput.value });
}

img.addEventListener('load', () => {
  window.requestAnimationFrame(walk);
});

window.addEventListener('load', () => {
  startGameButton.addEventListener('click', initGame);
});

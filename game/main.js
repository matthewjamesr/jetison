// Initialize constants
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const sound = document.getElementById("audio");

ctx.imageSmoothingEnabled = true;
ctx.imageSmoothingQuality = 'high';

canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;

// Import Entities, Sprites, Sounds
import Background from './Sprites/Background/Background.js';
import Player from './Entities/Player.js';

// Initialize background + player
const background = new Background(ctx, canvas.width, canvas.height);
const player = new Player(ctx, canvas);

// Start animation loop
function update () {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function animate () {
  update();

  background.draw();
  player.draw();
  requestAnimationFrame(animate);
}

animate();

$("#sound").click(function() {
  sound.play();
});

// Listen for start click
$("#start").click(function () {
  $(".main-menu").hide();
  player.prepStart = true;
});

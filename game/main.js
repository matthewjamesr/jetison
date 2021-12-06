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
import Enemy from './Entities/Enemy.js';

let enemies = [];
let startEnemies = false;
let score = 0;

// Initialize background + player
const background = new Background(ctx, canvas.width, canvas.height);
const player = new Player(ctx, canvas);

// Start animation loop
function update (delay) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function animate (time) {
  update(500);

  background.draw();
  player.draw();

  if (player.prepStart && !startEnemies) {
    startEnemies = true;
    createEnemies();
  }

  if (enemies.length > 0) {
    for (var i = 0; i < enemies.length; i++) {
      enemies[i].draw();

      if (enemies[i].x < player.x && !enemies[i].scoreCounted) {
        score += 100;
        enemies[i].scoreCounted = true;
        $(".score span").html(score);
      }

      // If enemy has left the game view, remove
      if (enemies[i].x < 0 - enemies[i].frameWidth * enemies[i].scale) {
        enemies.splice(i, 1);
        i--;
      }
    }
  }

  requestAnimationFrame(animate);
}

function createEnemies () {
  setInterval(function(){
    let spawnChance = Math.random();
    if (spawnChance > 0.5) {
      enemies.push(new Enemy(ctx, canvas));
      console.log("enemy spawned")
    }
  }, 1500);
}

animate();

$("#sound").click(function() {
  sound.pause();
});

// Listen for start click
$("#start").click(function () {
  $(".main-menu").hide();
  player.prepStart = true;
  sound.play();
});
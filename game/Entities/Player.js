const player_fly_idle = new Image();

player_fly_idle.src = "./game/Sprites/Player/bg_player.png";

const keys = { // keys to listen to
    ArrowUp: false,
    ArrowLeft: false,
    ArrowRight: false,
    ArrowDown: false,
    Space: false,
    KeyA: false,
    KeyD: false,
};
document.addEventListener('keydown', keyEvent);
document.addEventListener('keyup', keyEvent);

function keyEvent(e) {
  if (keys[e.code] !== undefined) {
      keys[e.code] = e.type === "keydown";
      e.preventDefault();
  }
}

export default class Player {

  constructor (ctx, canvas) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.x = this.canvas.width / 2;
    this.y = this.canvas.height / 2 - 100;
    this.frameWidth = 692;
    this.frameHeight = 599;
    this.row = 1;
    this.column = 1;
    this.scale = 0.20;
    this.speed = 0.6;
    this.gravity = 8;
    this.jetpackSpeed = 20
    this.wobble = 30;
    this.direction = "up";
    this.prepStart = false;
    this.finishPrep = false;
    this.move = true;
  }
  draw () {
    this.ctx.drawImage(player_fly_idle, this.column*this.frameWidth, this.row*this.frameHeight, this.frameWidth, this.frameHeight, this.x - (this.frameWidth * this.scale / 2), this.y - (this.frameHeight * this.scale / 2), this.frameWidth*this.scale, this.frameHeight*this.scale);

    if (!this.prepStart) {
      if (this.y > (this.canvas.height / 2 - 100) - this.wobble && this.direction === "up") {
        this.y -= this.speed;
      } else {
        this.direction = "down";
        if (this.y < (this.canvas.height / 2 - 100) + this.wobble && this.direction === "down") {
          this.y += this.speed;
        } else {
          this.direction = "up";
        }
      }
    }
    if (this.prepStart && !this.finishPrep) {
      if (this.x <= this.canvas.width + 20) {
        this.x += this.speed * 22;
      } else {
        this.x = -this.frameWidth - 20;
        this.finishPrep = true;
      }
    }
    if (this.finishPrep && this.move) {
      this.x += this.speed * 22;
      if (this.x >= this.canvas.width / 3) {
        this.move = false;
      }
    }

    // Handle collissions
    if (this.y < 60) {
      this.y += this.speed * this.jetpackSpeed
    }

    if (this.finishPrep && !this.move) {
      if (!keys.Space) { this.y += this.gravity }
      // Handle user input
      if (keys.Space) { this.y -= this.speed * this.jetpackSpeed }
      if (keys.ArrowLeft && keys.Space || keys.Space && keys.KeyA && !this.collide) { this.x -= this.speed * this.jetpackSpeed / 2 }
      if (keys.ArrowRight && keys.Space || keys.Space && keys.KeyD ** !this.collide) { this.x += this.speed * this.jetpackSpeed / 2 }
    }
  }
}

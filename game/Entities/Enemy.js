const player_fly_idle = new Image();

player_fly_idle.src = "./game/Sprites/Player/bg_player.png";

export default class Enemy {

  constructor (ctx, canvas) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.x = this.canvas.width + 20;
    this.y = Math.random() * this.canvas.height;
    this.frameWidth = 692;
    this.frameHeight = 599;
    this.row = 1;
    this.column = 1;
    this.scale = 0.20;
    this.speed = 7;
    this.gravity = 8;
    this.jetpackSpeed = 12,
    this.scoreCounted = false
  }

  draw () {
    if (this.y <= 10) {
        this.y = this.frameHeight / 2 * this.scale;
    }
    this.ctx.drawImage(player_fly_idle, this.column*this.frameWidth, this.row*this.frameHeight, this.frameWidth, this.frameHeight, this.x - (this.frameWidth * this.scale / 2), this.y - (this.frameHeight * this.scale / 2), this.frameWidth*this.scale, this.frameHeight*this.scale);
    this.x -= this.speed;
  }
}

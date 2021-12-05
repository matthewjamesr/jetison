const sky = new Image();
const midground = new Image();
const farground = new Image();

sky.src = "./game/Sprites/Background/sky_color.png";
midground.src = "./game/Sprites/Background/mid_ground_cloud_1.png";
farground.src = "./game/Sprites/Background/farground_cloud_1.png";

export default class Background {

  constructor (ctx, width, height) {
    this.ctx = ctx;
    this.cWidth = width;
    this.cHeight = height;
    this.midground = {
      x1: 0,
      x2: 2048,
      y: 0,
      fw: 2048,
      speed: 0.5
    },
    this.farground = {
      x1: 0,
      x2: 2048,
      y: 0,
      fw: 2048,
      speed: 2
    }
  }


  draw () {

    this.ctx.drawImage(sky, 0, 0, sky.width * this.cWidth, sky.height);
    this.ctx.drawImage(midground, this.midground.x1, 100);
    this.ctx.drawImage(midground, this.midground.x2, 100);
    this.ctx.drawImage(farground, this.farground.x1, 200);
    this.ctx.drawImage(farground, this.farground.x2, 200);

    // Midground
    if (this.midground.x1 < -this.midground.fw) this.midground.x1 = this.midground.fw + this.midground.x2 - this.midground.speed;
    else this.midground.x1 -= this.midground.speed;
    if (this.midground.x2 < -this.midground.fw) this.midground.x2 = this.midground.fw + this.midground.x1 - this.midground.speed;
    else this.midground.x2 -= this.midground.speed;

    // Farground
    if (this.farground.x1 < -this.farground.fw) this.farground.x1 = this.farground.fw + this.farground.x2 - this.farground.speed;
    else this.farground.x1 -= this.farground.speed;
    if (this.farground.x2 < -this.farground.fw) this.farground.x2 = this.farground.fw + this.farground.x1 - this.farground.speed;
    else this.farground.x2 -= this.farground.speed;
  }
}

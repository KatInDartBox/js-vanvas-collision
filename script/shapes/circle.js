import { drawCircle } from "./drawCircle.js";

export class Circle {
  constructor(centerX, centerY, radius) {
    this.center = { x: centerX, y: centerY };
    this.radius = radius;
  }
  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx, color) {
    drawCircle(ctx, this, color);
  }
  update(x, y) {
    x = x || this.center.x;
    y = y || this.center.y;
    this.center = { x, y };
  }
}

import { getNextPosition } from "../utils/getNextPosition.js";
import { drawPoints } from "./drawPoints.js";

export class Line {
  /**
   *
   * @param {number} startX most left x coordinate
   * @param {number} startY most left y coordinate
   * @param {number} width
   * @param {number} angle in deg
   */
  constructor(startX, startY, width, angle) {
    angle = angle || 0;
    this.x = startX;
    this.y = startY;
    this.angle = (Math.PI / 180) * angle;
    this.width = width;
  }
  get vertices() {
    const p0 = { x: this.x, y: this.y };
    let points = [p0];
    const p1 = getNextPosition(this.x, this.y, this.angle, this.width);
    points.push(p1);
    return points;
  }
  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx, color) {
    drawPoints(ctx, this.vertices, color);
  }
  update(x, y) {
    x = x || this.x;
    y = y || this.y;
    this.x = x;
    this.y = y;
  }
}

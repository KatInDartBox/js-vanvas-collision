import { getNextPosition } from "../utils/getNextPosition.js";
import { drawPoints } from "./drawPoints.js";

export class Polygon {
  /**
   *
   * @param {number} centerX
   * @param {number} centerY
   * @param {number} radius
   * @param {number} seq must be >= 3
   * @param {number} startAngle in deg
   */
  constructor(centerX, centerY, radius, segment, startAngle) {
    startAngle = startAngle ? (Math.PI / 180) * startAngle : 0;
    this.center = { x: centerX, y: centerY };
    this.radius = radius;
    this.seg = segment;
    this.segAngle = (Math.PI * 2) / this.seg;
    this.startAngle = startAngle;
  }

  get vertices() {
    let points = [];
    let startAngle = this.startAngle;
    for (let angle = startAngle; angle < Math.PI * 2 + startAngle; angle += this.segAngle) {
      const point = getNextPosition(this.center.x, this.center.y, angle, this.radius);
      points.push(point);
    }
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
    x = x || this.center.x;
    y = y || this.center.y;
    this.center = { x, y };
  }
}

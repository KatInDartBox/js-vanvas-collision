/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {tPoint[]} points
 */
export function drawPoints(ctx, points, color) {
  color = color || "#0e9bb4";
  ctx.strokeStyle = color;
  const p0 = points[0];
  ctx.beginPath();
  ctx.moveTo(p0.x, p0.y);
  for (let i = 1; i < points.length; i++) {
    const p = points[i];
    ctx.lineTo(p.x, p.y);
  }
  ctx.closePath();
  ctx.stroke();
}

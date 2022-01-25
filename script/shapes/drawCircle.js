/**
 *
 * @param {CanvasRenderingContext2D} ctx
 * @param {import('./shapes/circle.js').Circle} circle
 */
export function drawCircle(ctx, circle, color) {
  color = color || "#0e9bb4";
  ctx.strokeStyle = color;
  const c = circle.center;
  ctx.beginPath();
  ctx.arc(c.x, c.y, circle.radius, 0, Math.PI * 2);
  ctx.stroke();
}

import { Circle } from "./shapes/circle.js";
import { Line } from "./shapes/line.js";
import { Polygon } from "./shapes/polygon.js";
import { is2CircleCollide } from "./utils/collision/circle2circle.js";
import { isCircleAndPolygonCollide } from "./utils/collision/circle2polygon.js";
import { is2PolyCollide } from "./utils/collision/poly2poly.js";

const canvas = document.querySelector("canvas");

canvas.width = 700;
canvas.height = (9 / 16) * canvas.width;
const canvasBox = canvas.getBoundingClientRect();
const ctx = canvas.getContext("2d");
ctx.strokeStyle = "#0e9bb4";
ctx.lineWidth = 2;

/** @typedef {{x:number,y:number} tPoint} */

/** @type {HTMLSelectElement} */
const elmShape1 = document.querySelector("#shape1");
/** @type {HTMLSelectElement} */
const elmShape2 = document.querySelector("#shape2");

const shapeObj1 = {
  line: new Line(90, 200, 75, 15),
  square: new Polygon(90, 200, 50, 4, 45),
  polygon: new Polygon(90, 200, 65, 8),
  circle: new Circle(90, 200, 15),
};

const shapeObj2 = {
  line: new Line(90 + 340, 200, 115, -45),
  square: new Polygon(90 + 340, 200, 150, 4, 45),
  polygon: new Polygon(90 + 340, 200, 85, 3),
  circle: new Circle(90 + 340, 200, 35),
};
let selectShape1 = getSelectValue(elmShape1);
let selectShape2 = getSelectValue(elmShape2);
let shape1 = shapeObj1[selectShape1];
let shape2 = shapeObj2[selectShape2];
let mouse = {
  x: undefined,
  y: undefined,
};

elmShape1.addEventListener("change", () => {
  selectShape1 = getSelectValue(elmShape1);
  shape1 = shapeObj1[selectShape1];
});

elmShape2.addEventListener("change", () => {
  selectShape2 = getSelectValue(elmShape2);
  shape2 = shapeObj2[selectShape2];
});

canvas.addEventListener("mousemove", (e) => {
  mouse.x = e.x - canvasBox.left;
  mouse.y = e.y - canvasBox.top;
});

console.log(`shape:\n`, { square: shape1.vertices, polygon: shape2.vertices });

function getSelectValue(selectElm) {
  // console.log(`from select v:\n`, selectElm.options[selectElm.selectedIndex]);
  return selectElm.options[selectElm.selectedIndex].value;
}

function animation() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let isCollide = false;
  if (selectShape1 === "circle" && selectShape2 === "circle") {
    isCollide = is2CircleCollide(
      shape1.center.x,
      shape1.center.y,
      shape1.radius,
      shape2.center.x,
      shape2.center.y,
      shape2.radius
    );
  } else if (selectShape1 === "circle" && selectShape2 !== "circle") {
    const circle = { x: shape1.center.x, y: shape1.center.y, radius: shape1.radius };
    isCollide = isCircleAndPolygonCollide(circle, shape2.vertices);
  } else if (selectShape1 !== "circle" && selectShape2 === "circle") {
    const circle = { x: shape2.center.x, y: shape2.center.y, radius: shape2.radius };
    isCollide = isCircleAndPolygonCollide(circle, shape1.vertices);
  } else {
    isCollide = is2PolyCollide(shape1.vertices, shape2.vertices);
  }

  shape2.draw(ctx, "#cecece");
  shape2.update();

  const colorShape1 = isCollide ? "#a71717" : "#0e9bb4";
  shape1.draw(ctx, colorShape1);
  shape1.update(mouse.x, mouse.y);

  window.requestAnimationFrame(animation);
}

animation();

import { Circle } from "../types";

export const drawCircle = (
  canvas: CanvasRenderingContext2D,
  { x, y, radius, color = "black", width = 2 }: Circle
) => {
  canvas.beginPath();
  canvas.arc(x, y, radius, 0, 2 * Math.PI);
  canvas.fillStyle = color;
  canvas.lineWidth = width;
  canvas.fill();
};

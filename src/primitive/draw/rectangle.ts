import { Line } from "../types";

export const drawRectangle = (
  canvas: CanvasRenderingContext2D,
  { x1, y1, x2, y2, color = "black" }: Line
) => {
  canvas.beginPath();
  canvas.fillStyle = color;
  canvas.fillRect(x1, y1, Math.abs(x1 - x2), Math.abs(y1 - y2));
};

import { Line } from "../types";

export const drawLine = (
  canvas: CanvasRenderingContext2D,
  { x1, y1, x2, y2, color = "black", width = 2 }: Line
) => {
  canvas.beginPath();
  canvas.moveTo(x1, y1);
  canvas.lineTo(x2, y2);
  canvas.strokeStyle = color;
  canvas.lineWidth = width;
  canvas.stroke();
};

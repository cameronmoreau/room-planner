import { Label } from "../types";

export const drawText = (canvas: CanvasRenderingContext2D, label: Label) => {
  canvas.save();
  canvas.beginPath();
  canvas.font = "32px Arial";
  canvas.fillStyle = "black";
  canvas.textAlign = "center";
  // if (label.angle) {
  //   canvas.rotate(label.angle);
  // }
  // canvas.translate(label.x, label.y);
  canvas.fillText(label.text, label.x, label.y);

  canvas.restore();
};

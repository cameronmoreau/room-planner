import React, { useContext, useEffect } from "react";
import { Line } from "../types";
import { CanvasContext } from "./CanvasContext";

export const CanvasLine = ({
  x1,
  y1,
  x2,
  y2,
  color = "black",
  width = 2,
}: Line) => {
  const canvas = useContext(CanvasContext);

  useEffect(() => {
    canvas.beginPath();
    canvas.moveTo(x1, y1);
    canvas.lineTo(x2, y2);
    canvas.strokeStyle = color;
    canvas.lineWidth = width;
    canvas.stroke();
  }, []);

  return null;
};

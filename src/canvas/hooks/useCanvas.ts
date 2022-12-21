import { RefObject, useLayoutEffect, useRef, useState } from "react";

export interface UseCanvasResponse {
  context?: CanvasRenderingContext2D;
  ready: boolean;
}

export const useCanvas = (
  canvasRef: RefObject<HTMLCanvasElement>,
  draw: (canvas: CanvasRenderingContext2D) => void
): CanvasRenderingContext2D => {
  const contextRef = useRef<CanvasRenderingContext2D>();

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const context = canvas.getContext("2d");
    context.scale(2, 2);
    context.clearRect(0, 0, canvas.width, canvas.height);
    contextRef.current = context;

    draw(context);
  });

  return contextRef?.current;
};

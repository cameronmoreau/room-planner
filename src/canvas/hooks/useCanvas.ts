import { RefObject, useEffect, useRef, useState } from "react";

export interface UseCanvasResponse {
  context?: CanvasRenderingContext2D;
  ready: boolean;
}

export const useCanvas = (
  canvasRef: RefObject<HTMLCanvasElement>
): [boolean, CanvasRenderingContext2D] => {
  const contextRef = useRef<CanvasRenderingContext2D>();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const context = canvas.getContext("2d");
    context.scale(2, 2);
    contextRef.current = context;
    setReady(true);
  }, []);

  return [ready, contextRef?.current];
};

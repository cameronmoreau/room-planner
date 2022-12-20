import React, { useRef, useState } from "react";
import { CanvasContext, CanvasLine } from "./canvas/components";
import { useCanvas } from "./canvas/hooks/useCanvas";
import { Line, Point } from "./canvas/types";

function App() {
  const canvasRef = useRef<HTMLCanvasElement>();
  const [ready, canvas] = useCanvas(canvasRef);

  const [initPoint, setInitPoint] = useState<Point>(null);
  const [lines, setLines] = useState<Line[]>([
    { x1: 0, y1: 20, x2: 20, y2: 100 },
    { x1: 300, y1: 250, x2: 260, y2: 70, color: "red" },
    { x1: 70, y1: 240, x2: 160, y2: 120, color: "green", width: 5 },
  ]);

  const onMouseDown = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    const { clientX, clientY } = event;

    if (initPoint) {
      setLines((v) => [
        ...v,
        { x1: initPoint.x, y1: initPoint.y, x2: clientX, y2: clientY },
      ]);
      setInitPoint(null);
      return;
    }

    setInitPoint({ x: clientX, y: clientY });
  };

  return (
    <div>
      <canvas ref={canvasRef} onMouseDown={onMouseDown}>
        {ready && (
          <CanvasContext.Provider value={canvas}>
            {lines.map((line, i) => (
              <CanvasLine key={`line-${i}`} {...line} />
            ))}
          </CanvasContext.Provider>
        )}
      </canvas>
    </div>
  );
}

export default App;

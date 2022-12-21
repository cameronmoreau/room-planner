import React, { useRef, useState } from "react";
import { useCanvas } from "./canvas/hooks/useCanvas";
import { Toolbar } from "./components";
import { drawCircle } from "./primitive/draw/circle";
import { drawLine } from "./primitive/draw/line";
import { intersectsLine } from "./primitive/math";
import { Line, Point } from "./primitive/types";
import { Action } from "./types";

function App() {
  const canvasRef = useRef<HTMLCanvasElement>();
  const [action, setAction] = useState<Action>("select");
  const [initPoint, setInitPoint] = useState<Point>(null);

  const [drawingCursor, setDrawingCursor] = useState<Point>(null);

  const [lines, setLines] = useState<Line[]>([
    { x1: 0, y1: 20, x2: 20, y2: 100 },
    { x1: 300, y1: 250, x2: 260, y2: 70, color: "red" },
    { x1: 70, y1: 240, x2: 160, y2: 120, color: "green", width: 5 },
  ]);

  const [selectedIndex, setSelectedIndex] = useState<number>(null);

  const canvas = useCanvas(canvasRef, (c) => {
    lines.forEach((line, i) => {
      if (i === selectedIndex) {
        drawLine(c, { ...line, color: "purple" });
      } else {
        drawLine(c, line);
      }
    });

    if (initPoint) {
      drawCircle(c, { ...initPoint, radius: 5 });
    }

    if (initPoint && drawingCursor) {
      drawLine(canvas, {
        x1: initPoint.x,
        y1: initPoint.y,
        x2: drawingCursor.x,
        y2: drawingCursor.y,
        color: "pink",
      });
    }
  });

  const onMouseMove = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    if (initPoint) {
      setDrawingCursor({ x: event.clientX, y: event.clientY });
    }
  };

  const onMouseDown = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    const { clientX, clientY } = event;

    switch (action) {
      case "draw": {
        setInitPoint({ x: clientX, y: clientY });
        return;
      }

      case "select": {
        const index = lines.findIndex((line) => {
          return intersectsLine({ x: clientX, y: clientY }, line);
        });

        if (index >= 0) {
          setSelectedIndex(index);
        }

        return;
      }
    }
  };

  const onMouseUp = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    if (initPoint) {
      setLines((v) => [
        ...v,
        {
          x1: initPoint.x,
          y1: initPoint.y,
          x2: event.clientX,
          y2: event.clientY,
        },
      ]);
      setDrawingCursor(null);
      setInitPoint(null);
    }
  };

  return (
    <div>
      <div style={{ position: "absolute" }}>
        <Toolbar value={action} onChange={setAction} />
      </div>
      <canvas
        ref={canvasRef}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
      >
        {/* 
        TODO: Figure out how to put drawing method in canvas children
        {canvas && (
          <CanvasContext.Provider value={canvas}>
          {lines.map((line, i) => (
            <CanvasLine key={`line-${i}`} {...line} />
            ))}
            </CanvasContext.Provider>
          )} */}
      </canvas>
    </div>
  );
}

export default App;

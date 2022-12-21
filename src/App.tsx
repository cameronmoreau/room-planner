import React, { useRef, useState } from "react";
import { useCanvas } from "./canvas/hooks/useCanvas";
import { Toolbar } from "./components";
import {
  drawWall,
  findIntersectedAnchor,
  getAnchors,
} from "./planner/components/wall";
import { Wall } from "./planner/types";
import { drawLine } from "./primitive/draw/line";
import { intersectsLine, intersectsRect } from "./primitive/math";
import { Line, Point, Shape } from "./primitive/types";
import { Action } from "./types";
import { randomId } from "./utils";

function App() {
  const canvasRef = useRef<HTMLCanvasElement>();
  const [action, setAction] = useState<Action>("draw");
  const [initPoint, setInitPoint] = useState<Point>(null);

  const [drawingCursor, setDrawingCursor] = useState<Point>(null);

  const [walls, setWalls] = useState<Wall[]>([
    {
      id: randomId(),
      type: "wall",
      shape: {
        x1: 80,
        y1: 80,
        x2: 450,
        y2: 80,
      },
    },
  ]);

  const [selectedIndex, setSelectedIndex] = useState<number>(null);

  useCanvas(canvasRef, (c) => {
    walls.forEach((wall, i) => {
      drawWall(c, wall, i === selectedIndex);
    });

    if (initPoint && drawingCursor) {
      drawLine(c, {
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
    const { clientX: x, clientY: y } = event;

    switch (action) {
      case "draw": {
        let startX = x;
        let startY = y;

        // Check if on anchor
        const anchor = findIntersectedAnchor(walls, { x, y });
        if (anchor) {
          startX = anchor.x1 + Math.abs(anchor.x1 - anchor.x2) / 2;
          startY = anchor.y1 + Math.abs(anchor.y1 - anchor.y2) / 2;
        }

        setInitPoint({ x: startX, y: startY });
        return;
      }

      case "select": {
        const index = walls.findIndex((wall) => {
          return intersectsLine({ x, y }, wall.shape);
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
    const { clientX: x, clientY: y } = event;

    if (initPoint) {
      let endX = x;
      let endY = y;

      const anchor = findIntersectedAnchor(walls, { x, y });
      if (anchor) {
        endX = anchor.x1 + Math.abs(anchor.x1 - anchor.x2) / 2;
        endY = anchor.y1 + Math.abs(anchor.y1 - anchor.y2) / 2;
      }

      setWalls((v) => [
        ...v,
        {
          id: randomId(),
          type: "wall",
          shape: {
            x1: initPoint.x,
            y1: initPoint.y,
            x2: endX,
            y2: endY,
          },
        },
      ]);
      setDrawingCursor(null);
      setInitPoint(null);
      setAction("move");
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

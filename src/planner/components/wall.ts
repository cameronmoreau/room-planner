import { drawCircle } from "../../primitive/draw/circle";
import { drawLine } from "../../primitive/draw/line";
import { drawText } from "../../primitive/draw/text";
import {
  angle,
  distance,
  intersectsRect,
  shapeCenter,
} from "../../primitive/math";
import { Point, Shape } from "../../primitive/types";
import { Wall } from "../types";

export const ANCHOR_SIZE = 10;

export const drawWall = (
  canvas: CanvasRenderingContext2D,
  wall: Wall,
  isSelected = false
) => {
  drawLine(canvas, {
    ...wall.shape,
    color: isSelected ? "#8c9eff" : "#424242",
    width: 5,
  });

  const [left, right] = getAnchors(wall);

  drawCircle(canvas, {
    x: left.x1 + ANCHOR_SIZE,
    y: left.y1 + ANCHOR_SIZE,
    radius: ANCHOR_SIZE,
    color: "#e7b9ff",
  });

  drawCircle(canvas, {
    x: right.x2 - ANCHOR_SIZE,
    y: right.y2 - ANCHOR_SIZE,
    radius: ANCHOR_SIZE,
    color: "#e7b9ff",
  });

  const feet = Math.round(
    distance(
      { x: wall.shape.x1, y: wall.shape.y1 },
      { x: wall.shape.x2, y: wall.shape.y2 }
    ) / 50
  );

  drawText(canvas, {
    ...shapeCenter(wall.shape),
    angle: angle(
      { x: wall.shape.x1, y: wall.shape.y1 },
      { x: wall.shape.x2, y: wall.shape.y2 }
    ),
    text: `${feet * 12}in`,
  });
};

export const getAnchors = (wall: Wall): [Shape, Shape] => {
  return [
    {
      x1: wall.shape.x1 - ANCHOR_SIZE,
      y1: wall.shape.y1 - ANCHOR_SIZE,
      x2: wall.shape.x1 + ANCHOR_SIZE,
      y2: wall.shape.y1 + ANCHOR_SIZE,
    },
    {
      x1: wall.shape.x2 - ANCHOR_SIZE,
      y1: wall.shape.y2 - ANCHOR_SIZE,
      x2: wall.shape.x2 + ANCHOR_SIZE,
      y2: wall.shape.y2 + ANCHOR_SIZE,
    },
  ];
};

export const findIntersectedAnchor = (walls: Wall[], point: Point): Shape => {
  return walls
    .reduce<Shape[]>((acc, wall) => {
      return [...acc, ...getAnchors(wall)];
    }, [])
    .find((anchor) => {
      return intersectsRect({ x: point.x, y: point.y }, anchor);
    });
};

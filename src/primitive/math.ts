import { Point, Shape } from "./types";

const center = (a: number, b: number) => {
  return (a + b) / 2;
};

export const shapeCenter = (shape: Shape): Point => {
  return {
    x: center(shape.x1, shape.x2),
    y: center(shape.y1, shape.y2),
  };
};

export const angle = (p1: Point, p2: Point): number => {
  return Math.atan2(p2.y - p1.y, p2.x - p1.x);
};

export const distance = (a: Point, b: Point): number => {
  return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
};

export const intersectsLine = (point: Point, line: Shape): boolean => {
  const a = { x: line.x1, y: line.y1 };
  const b = { x: line.x2, y: line.y2 };
  const c = { x: point.x, y: point.y };

  const offset = distance(a, b) - (distance(a, c) + distance(b, c));

  return Math.abs(offset) < 1;
};

export const intersectsRect = (point: Point, rect: Shape): boolean => {
  const minX = Math.min(rect.x1, rect.x2);
  const maxX = Math.max(rect.x1, rect.x2);
  const minY = Math.min(rect.y1, rect.y2);
  const maxY = Math.max(rect.y1, rect.y2);

  return (
    point.x >= minX && point.x <= maxX && point.y >= minY && point.y <= maxY
  );
};

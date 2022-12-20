export interface Style {
  color?: string;
  width?: number;
}

export interface Point {
  x: number;
  y: number;
}

export interface Line extends Style {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

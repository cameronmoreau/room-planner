export interface Style {
  color?: string;
  width?: number;
}

export interface Point {
  x: number;
  y: number;
}

export interface Shape {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export interface Circle extends Point, Style {
  radius: number;
}

export interface Line extends Shape, Style {}

export interface Label extends Point {
  text: string;
  angle?: number;
}

import { Shape } from "../primitive/types";

export interface Wall {
  id: string;
  type: "wall";
  shape: Shape;
}

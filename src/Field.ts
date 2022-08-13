import { Cell } from "./structures";

export const CW = 20;

export class Field {
  canvasWidthP: number;
  canvasHeightP: number;
  lastX: number;
  lastY: number;

  constructor(canvas: any) {
    this.canvasWidthP = canvas.width;
    this.canvasHeightP = canvas.height;
    this.lastX = this.canvasWidthP / CW - 1;
    this.lastY = this.canvasHeightP / CW - 1;
  }

  getFreeCell(): Cell {
    let cell: Cell = {
      x: Math.round(Math.random() * this.lastX),
      y: Math.round(Math.random() * this.lastY)
    };
    return cell;
  }
}

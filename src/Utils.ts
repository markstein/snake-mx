import { Cell } from "./structures";

export const RIGHT = "right";
export const LEFT = "left";
export const UP = "up";
export const DOWN = "down";
export const startSpeed = 400;

export class Utils {
  static isCellEquals(c1: Cell, c2: Cell): any {
    return c1.x == c2.x && c1.y == c2.y;
  }
  public static createUid(): string {
    return Math.floor((1 + Math.random()) * 0x1000000)
      .toString(16)
      .substring(1);
  }
  public static convertToPlainObject(complexObject: any): any {
    return (<any>Object).assign({}, complexObject);
  }
}

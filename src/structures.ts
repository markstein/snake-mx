import { RIGHT } from "./Utils";

export class Game {
  snakes: any = {};
  isCheatMode: boolean = false;
  speed: number = 100;
  egg: Cell = { x: 7, y: 7 };

  constructor(public uid: string) {}
}

export class Snake {
  score: number = 0;
  direction: string = RIGHT;
  body: Cell[];

  constructor(public uid: string) {
    this.body = [{ x: 5, y: 5 }];
  }
}

export class Cell {
  constructor(public x: number, public y: number) {}
}

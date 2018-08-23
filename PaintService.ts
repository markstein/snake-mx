import { GameService } from "./GameService";
import { Game, Snake } from "./structures";

export class PaintService {
  ctx: CanvasRenderingContext2D;
  cellWidth: number = 20;

  constructor(public gameService: GameService, public canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.ctx.font = "10px 'Press Start 2P',cursive ";
  }

  paintGame(game: Game) {
    this.fillFull("black");

    this.ctx.font = "10px 'Press Start 2P',cursive ";

    //paint scores
    this.ctx.textAlign = "start";
    let position = 5;
    for (let snakeUid in game.snakes) {
      let snake: Snake = game.snakes[snakeUid];
      let scoreText = `Score ${snake.uid}: ${snake.score}`;
      this.ctx.fillStyle = snake.uid === this.gameService.snake.uid ? "yellow" : "white";
      this.ctx.fillText(scoreText, position, this.canvas.height - 5);
      position += 200;
    }

    //paint snakes
    for (let snakeUid in game.snakes) {
      let snake: Snake = game.snakes[snakeUid];
      if (snake.uid === this.gameService.snake.uid) {
        this.gameService.snake.body.forEach(c => this.paintCell(c.x, c.y, "orange"));
      } else {
        snake.body.forEach(c => this.paintCell(c.x, c.y, "white"));
      }
    }

    //paint cheat-mode
    if (game.isCheatMode) {
      this.ctx.textAlign = "center";
      this.ctx.fillText("CHEAT", this.canvas.width / 2, this.canvas.height - 5);
      this.ctx.fillText(game.speed + "", this.canvas.width / 2, 12);
    }

    //paint egg
    this.paintCell(game.egg.x, game.egg.y, "blue");
  }

  private fillFull(color: string) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.strokeStyle = color;
    this.ctx.strokeRect(0, 0, this.canvas.width, this.canvas.height);
  }

  paintEntryView() {
    this.ctx.fillStyle = "yellow";
    this.ctx.textAlign = "center";
    this.ctx.font = "20px 'Press Start 2P',cursive";
    this.ctx.fillText("Press Enter", this.canvas.width / 2, this.canvas.height / 2);
  }

  gameOver() {
    this.ctx.fillStyle = "yellow";
    this.ctx.textAlign = "center";
    this.ctx.font = "60px 'Press Start 2P',cursive";
    this.ctx.fillText("GAME OVER", this.canvas.width / 2, this.canvas.height / 2 - 50);
  }

  printPause() {
    this.fillFull("rgba(255, 255, 255, 0.1)");

    this.ctx.fillStyle = "yellow";
    this.ctx.textAlign = "center";
    this.ctx.font = "60px 'Press Start 2P',cursive";
    this.ctx.fillText("||", this.canvas.width / 2, this.canvas.height / 2);
  }

  paintCell(x: number, y: number, color: string, width: number = this.cellWidth) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x * width, y * width, width, width);
    this.ctx.strokeStyle = "black";
    this.ctx.strokeRect(x * width, y * width, width, width);
  }
}

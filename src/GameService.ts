import { Game, Snake, Cell } from "./structures";
import { Utils, RIGHT, LEFT, UP, DOWN } from "./Utils";
import { PaintService } from "./PaintService";
import { Field } from "./Field";
import { BackendService } from "./BackendService";

export class GameService {
  paintService: PaintService;
  game!: Game;
  snake: Snake = new Snake(Utils.createUid());
  backend: BackendService = new BackendService();
  db: any = {};
  field: Field;
  stopped: boolean = false;

  constructor() {
    const canvas: HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement;
    this.field = new Field(canvas);

    this.paintService = new PaintService(this, canvas);
  }

  setup(gameUid: string) {
    

    this.db.get().then(doc => {
      if (doc.exists) {
        this.game = doc.data() as any;
      } else {
        this.game = new Game(gameUid);

        this.db.set(Utils.convertToPlainObject(this.game));
      }
      document.onkeydown = this.setupKeyboardEvent();
      this.registerControlButtons();
      this.paintService.paintEntryView();
    });
  }

  init() {
    console.log("init " + this.stopped);
    if (this.stopped) {
      return;
    }
    this.stopped = false;
    this.run();
  }

  pause() {
    console.log("pause");
  }

  run() {
    this.db.get().then(doc => {
      this.game = doc.data() as any;

      this.moveSnake();
      this.checkEgg();

      this.sendSnake();
      this.paintService.paintGame(this.game);
      setTimeout(() => this.run(), this.game.speed);
    });
  }

  moveSnake() {
    let { x, y } = this.snake.body[0];

    if (this.snake.direction == RIGHT) x++;
    else if (this.snake.direction == LEFT) x--;
    else if (this.snake.direction == UP) y--;
    else if (this.snake.direction == DOWN) y++;

    x = (x + this.field.lastX + 1) % (this.field.lastX + 1);
    y = (y + this.field.lastY + 1) % (this.field.lastY + 1);

    this.snake.body.unshift({ x: x, y: y });
  }

  checkEgg() {
    if (Utils.isCellEquals(this.game.egg, this.snake.body[0])) {
      this.game.egg = this.field.getFreeCell();
      this.game.speed = Math.max(50, this.game.speed - 10);
      this.db.set({ egg: Utils.convertToPlainObject(this.game.egg), speed: this.game.speed }, { merge: true });
      this.snake.score++;
    } else {
      this.snake.body.pop();
    }
  }

  sendSnake() {
    this.db.set({ snakes: { [this.snake.uid]: Utils.convertToPlainObject(this.snake) } }, { merge: true });
  }

  setupKeyboardEvent(): any {
    let gs = this;
    return function(e: KeyboardEvent) {
      var key = e.key;

      if (key === "ArrowLeft" && gs.snake.direction !== RIGHT) gs.snake.direction = LEFT;
      else if (key == "ArrowUp" && gs.snake.direction != DOWN) gs.snake.direction = UP;
      else if (key == "ArrowRight" && gs.snake.direction != LEFT) gs.snake.direction = RIGHT;
      else if (key == "ArrowDown" && gs.snake.direction != UP) gs.snake.direction = DOWN;
      else if (key == "Enter") {
        gs.init();
      } else if (key == "p" && !gs.stopped) {
        gs.pause();
      } else if (key == "c") {
        gs.game.isCheatMode = !gs.game.isCheatMode;
        console.log("-=CHEAT=- : " + gs.game.isCheatMode);
      }
    };
  }

  registerControlButtons() {
    [LEFT, RIGHT, UP, DOWN].forEach(direction => {
      let icon: any = document.getElementById("i" + direction) as HTMLImageElement;
      icon.onclick = () => (this.snake.direction = direction);
    });
    let eIcon: any = document.getElementById("canvas") as HTMLElement;
    eIcon.onclick = () => this.init();
  }
}

import { GameService } from './GameService';
import { Utils } from './Utils';

function start() {
  var gameService = new GameService();
  let gameUid = window.location.hash ? window.location.hash.substring(1) : Utils.createUid();
  window.location.hash = '#' + gameUid;
  gameService.setup(gameUid);
}

start();

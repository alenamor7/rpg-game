import ClientEngine from './ClientEngine';
import ClientWorld from './ClientWorld';

import levelCfg from '../configs/world.json';
import sprites from '../configs/sprites';
import gameObjects from '../configs/gameObjects.json';

// describes col and row changes for each directions
const directions = {
  ArrowLeft: [-1, 0],
  ArrowRight: [1, 0],
  ArrowUp: [0, -1],
  ArrowDown: [0, 1],
};

class ClientGame {
  constructor(cfg) {
    Object.assign(this, {
      cfg,
      gameObjects,
      player: null,
    });

    this.engine = this.createEngine();
    this.map = this.createWorld();
    this.initEngine();
  }

  setPlayer(player) {
    this.player = player;
  }

  createEngine() {
    return new ClientEngine(document.getElementById(this.cfg.tagId));
  }

  createWorld() {
    return new ClientWorld(this, this.engine, levelCfg);
  }

  initEngine() {
    this.engine.loadSprites(sprites).then(() => {
      this.map.init();
      this.engine.on('render', (_, timestamp) => {
        this.map.render(timestamp);
      });
      this.engine.start();
      this.initKeys();
    });
  }

  initKeys() {
    this.engine.input.onKey({
      ArrowLeft: (keydown) => {
        this.move('ArrowLeft', keydown);
      },
      ArrowRight: (keydown) => {
        this.move('ArrowRight', keydown);
      },
      ArrowUp: (keydown) => {
        this.move('ArrowUp', keydown);
      },
      ArrowDown: (keydown) => {
        this.move('ArrowDown', keydown);
      },
    });
  }

  move(direction, keydown) {
    if (keydown) {
      this.player.moveByCellCoord(...directions[direction], (cell) => cell.findObjectsByType('grass').length);
    }
  }

  static init(cfg) {
    if (!ClientGame.game) {
      ClientGame.game = new ClientGame(cfg);
    }
  }
}

export default ClientGame;

import ClientEngine from './ClientEngine';
import ClientWorld from './ClientWorld';

import levelCfg from '../configs/world.json';
import sprites from '../configs/sprites';
import gameObjects from '../configs/gameObjects.json';

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
    return new ClientEngine(document.getElementById(this.cfg.tagId), this);
  }

  createWorld() {
    return new ClientWorld(this, this.engine, levelCfg);
  }

  getWorld() {
    return this.map;
  }

  initEngine() {
    this.engine.loadSprites(sprites).then(() => {
      this.map.init();
      this.engine.on('render', (_, timestamp) => {
        this.engine.camera.focusAtCameraObject(this.player);
        this.map.render(timestamp);
      });
      this.engine.start();
      this.initKeys();
    });
  }

  initKeys() {
    this.engine.input.onKey({
      ArrowLeft: (keydown) => keydown && this.move('left'),
      ArrowRight: (keydown) => keydown && this.move('right'),
      ArrowUp: (keydown) => keydown && this.move('up'),
      ArrowDown: (keydown) => keydown && this.move('down'),
    });
  }

  move(direction) {
    // describes col and row changes for each directions
    const directions = {
      left: [-1, 0],
      right: [1, 0],
      up: [0, -1],
      down: [0, 1],
    };

    const { player } = this;

    if (player && player.motionProgress === 1) {
      const canMove = player.moveByCellCoord(
        ...directions[direction],
        (cell) => cell.findObjectsByType('grass').length,
      );

      if (canMove) {
        player.setState(direction);
        player.once('motion-stopped', () => player.setState('main'));
      }
    }
  }

  static init(cfg) {
    if (!ClientGame.game) {
      ClientGame.game = new ClientGame(cfg);
    }
  }
}

export default ClientGame;

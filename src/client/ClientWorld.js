class ClientWorld {
  constructor(game, engine, levelCfg) {
    Object.assign(this, {
      game,
      engine,
      levelCfg,
      height: levelCfg.map.length,
      width: levelCfg.map[0].length,
    });
  }

  init() {
    const { map } = this.levelCfg;
    map.forEach((cfgRow, y) => {
      cfgRow.forEach((cfgCell, x) => {
        console.log(this.levelCfg);
        const spriteW = this.engine.canvas.width / this.width;
        const spriteH = this.engine.canvas.height / this.height;
        this.engine.renderSpriteFrame({
          sprite: ['terrain', cfgCell[0]],
          frame: 0,
          x: x * spriteW,
          y: y * spriteH,
          w: spriteW,
          h: spriteH,
        });
      });
    });
  }
}

export default ClientWorld;

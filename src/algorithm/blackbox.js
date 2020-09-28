import config from './blackbox.config.json';
import { Cursor } from './cursor';

const BOX_TARGET = 16;

export class BlackBox {

  static get size() {
    return config.box.size;
  }

  static isInBox(x, y) {
    return (x >= 0 && x <= config.box.size + 1) && (y >= 0 && y <= config.box.size + 1);
  }

  static isInner(x, y) {
    return (x >= 1 && x <= config.box.size) && (y >= 1 && y <= config.box.size);
  }

  constructor() {
    this.init();
  }

  get raderIndex() {
    return this.raderCount;
  }

  init() {        
    this.raderCount = 0;

    this.box =
      Array(config.box.size + 2).fill().map(() =>
        Array(config.box.size + 2).fill().map(() => 0));

    const random = () => Math.floor(Math.random() * config.box.size) + 1;

    for (let i = 0; i < config.box.target; i++) {
      let x;
      let y;

      do {
        x = random();
        y = random();
      } while (this.box[y][x] !== 0);

      this.box[y][x] = BOX_TARGET;
    }
  }

  isRaderEnable() {
    return this.raderCount < config.rader.max;
  }

  shootRader(raderName, raderIndex) {
    if (!this.isRaderEnable()) {
      return null;
    }

    ++this.raderCount;
    const cursor = new Cursor(config.box.size);
    const drawShot = (x, y, shot) => this.addValue(x, y, shot);
    const isTarget = (x, y) => this.getValue(x, y) === BOX_TARGET;

    const moveWhileDraw = () => {
      cursor.drawShotOut(drawShot);
      cursor.move();
      cursor.drawShotIn(drawShot);
      return BlackBox.isInBox(cursor.x, cursor.y);
    };

    switch (raderName) {
      case 'top':    cursor.readyOnTop(raderIndex + 1); break;
      case 'right':  cursor.readyOnRight(raderIndex + 1); break;
      case 'bottom': cursor.readyOnBottom(raderIndex + 1); break;
      case 'left':   cursor.readyOnLeft(raderIndex + 1); break;
    }

    moveWhileDraw();

    if (cursor.lookLeft(isTarget)
      || cursor.lookCenter(isTarget)
      || cursor.lookRight(isTarget)) {

      return null;
    }

    while (moveWhileDraw()) {
      const left = cursor.lookLeft(isTarget);
      const center = cursor.lookCenter(isTarget);
      const right = cursor.lookRight(isTarget);

      if (center || (left && right)) {
        return null;
      }

      if (left) {
        cursor.turnRight();
      }

      if (right) {
        cursor.turnLeft();
      }
    }

    switch (cursor.dir) {
      case Cursor.GO_DOWN:  return { name: 'bottom', index: cursor.x - 1 };
      case Cursor.GO_LEFT:  return { name: 'left',   index: cursor.y - 1 };
      case Cursor.GO_UP:    return { name: 'top',    index: cursor.x - 1 };
      case Cursor.GO_RIGHT: return { name: 'right',  index: cursor.y - 1 };
    }
  }

  getSymbol(x, y) {
    switch (this.getValue(x, y)) {
      case 0b00000: return '';
      case 0b00001: return config.box.symbol.line_u;
      case 0b00010: return config.box.symbol.line_r;
      case 0b00011: return config.box.symbol.line_ur;
      case 0b00100: return config.box.symbol.line_d;
      case 0b00101: return config.box.symbol.line_v;
      case 0b00110: return config.box.symbol.line_dr;
      case 0b01000: return config.box.symbol.line_l;
      case 0b01001: return config.box.symbol.line_ul;
      case 0b01010: return config.box.symbol.line_h;
      case 0b01100: return config.box.symbol.line_dl;
      case 0b01111: return config.box.symbol.line_cr;
      case 0b10000: return config.box.symbol.target;
      default:      return config.box.symbol.unknown;
    }
  }

  getValue(x, y) {
    if (BlackBox.isInBox(x, y)) {
      return this.box[y][x];
    } else {
      return 0;
    }
  }

  addValue(x, y, value) {
    if (BlackBox.isInBox(x, y)) {
      this.box[y][x] += value;
    }
  }
}

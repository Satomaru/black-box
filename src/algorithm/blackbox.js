import config from './config.json';
import constant from './constant.json';
import { Cursor } from './cursor';
import { utils } from '../utils';

export class BlackBox {

  static get SIZE() {
    return constant.box.size;
  }

  static get REGION() {
    return constant.box.size + 2;
  }

  static get TARGETS() {
    return config.box.targets;
  }

  static get RADERS() {
    return config.rader.limit;
  }

  static isRegion(x, y) {
    return (
      (x >= 0 && x < BlackBox.REGION) &&
      (y >= 0 && y < BlackBox.REGION)
    );
  }

  static isInBox(x, y) {
    return (
      (x >= 1 && x <= BlackBox.SIZE) &&
      (y >= 1 && y <= BlackBox.SIZE)
    );
  }

  get raderIndex() {
    return this.raderCount;
  }

  get raderRemain() {
    return BlackBox.RADERS - this.raderCount;
  }

  init() {
    this.conjecture = [];
    this.box = utils.square(BlackBox.REGION).make(0);
    this.raderCount = 0;
    this.opened = false;

    for (let i = 0; i < BlackBox.TARGETS; i++) {
      let x;
      let y;

      do {
        x = utils.random(1, BlackBox.SIZE);
        y = utils.random(1, BlackBox.SIZE);
      } while (this.box[y][x] !== 0);

      this.box[y][x] = constant.cell.value.target;
    }
  }

  shootRader(raderName, raderIndex) {
    if (!this.isRaderEnable()) {
      return null;
    }

    ++this.raderCount;

    const cursor = new Cursor();
    const drawShot = (x, y, shot) => this.addValue(x, y, shot);
    const isTarget = (x, y) => this.getValue(x, y) === constant.cell.value.target;

    const moveWhileDraw = () => {
      cursor.drawShotOut(drawShot);
      cursor.move();
      cursor.drawShotIn(drawShot);
      return BlackBox.isRegion(cursor.x, cursor.y);
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

      return { penetrated: false };
    }

    while (moveWhileDraw()) {
      const left = cursor.lookLeft(isTarget);
      const center = cursor.lookCenter(isTarget);
      const right = cursor.lookRight(isTarget);

      if (center || (left && right)) {
        return { penetrated: false };
      }

      if (left) {
        cursor.turnRight();
      }

      if (right) {
        cursor.turnLeft();
      }
    }

    switch (cursor.dir) {
      case Cursor.GO_DOWN:  return { penetrated: true, name: 'bottom', index: cursor.x - 1 };
      case Cursor.GO_LEFT:  return { penetrated: true, name: 'left',   index: cursor.y - 1 };
      case Cursor.GO_UP:    return { penetrated: true, name: 'top',    index: cursor.x - 1 };
      case Cursor.GO_RIGHT: return { penetrated: true, name: 'right',  index: cursor.y - 1 };
    }
  }

  turnConjecture(x, y) {
    if (this.opened || !BlackBox.isInBox(x, y)) {
      return false;
    }

    const index = this.conjecture.findIndex(value => value.x === x && value.y === y);

    if (index === -1) {
      if (this.conjecture.length >= BlackBox.TARGETS) {
        return false;
      }

      this.conjecture.push({ x: x, y: y });
    } else {
      this.conjecture.splice(index, 1);
    }

    return true;
  }

  open() {
    if (this.opened) {
      return false;
    }

    this.opened = true;
    return true;
  }

  getSymbol(x, y) {
    if (this.opened || !BlackBox.isInBox(x, y)) {
      switch (this.getValue(x, y)) {
        case constant.cell.value.line_u:     return config.cell.symbol.line_u;
        case constant.cell.value.line_r:     return config.cell.symbol.line_r;
        case constant.cell.value.line_ur:    return config.cell.symbol.line_ur;
        case constant.cell.value.line_d:     return config.cell.symbol.line_d;
        case constant.cell.value.line_v:     return config.cell.symbol.line_v;
        case constant.cell.value.line_dr:    return config.cell.symbol.line_dr;
        case constant.cell.value.line_l:     return config.cell.symbol.line_l;
        case constant.cell.value.line_ul:    return config.cell.symbol.line_ul;
        case constant.cell.value.line_h:     return config.cell.symbol.line_h;
        case constant.cell.value.line_dl:    return config.cell.symbol.line_dl;
        case constant.cell.value.line_cr:    return config.cell.symbol.line_cr;
        case constant.cell.value.target:     return config.cell.symbol.target;
        default: return '';
      }
    } else {
      return this.isConjectured(x, y) ? config.cell.symbol.conjecture : '';
    }
  }

  getValue(x, y) {
    if (BlackBox.isRegion(x, y)) {
      return this.box[y][x];
    } else {
      return 0;
    }
  }

  addValue(x, y, value) {
    if (BlackBox.isRegion(x, y)) {
      this.box[y][x] += value;
    }
  }

  isRaderEnable() {
    return !this.opened && this.raderCount < BlackBox.RADERS;
  }

  isConjectured(x, y) {
    return this.conjecture.some(value => value.x === x && value.y === y);
  }

  isOpened() {
    return this.opened;
  }
}

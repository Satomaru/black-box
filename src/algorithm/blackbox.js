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
    return constant.box.targets;
  }

  static get RADERS() {
    return constant.rader.limit;
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

  get score() {
    const loss = (this.raderCount > BlackBox.TARGETS) ? this.raderCount - BlackBox.TARGETS : 0;
    return Math.floor((100 - loss * 10) * this.hits / BlackBox.TARGETS);
  }

  init() {
    this.conjectures = [];
    this.box = utils.square(BlackBox.REGION).make(0);
    this.raderCount = 0;
    this.hits = 0;
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
    if (!this.isRaderEnabled()) {
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

    const index = this.conjectures.findIndex(value => value.x === x && value.y === y);

    if (index === -1) {
      if (this.conjectures.length >= BlackBox.TARGETS) {
        return false;
      }

      this.conjectures.push({ x: x, y: y });
    } else {
      this.conjectures.splice(index, 1);
    }

    return true;
  }

  open() {
    if (this.opened || this.conjectures.length !== BlackBox.TARGETS) {
      return false;
    }

    this.hits = this.conjectures
      .map(value => this.box[value.y][value.x] === constant.cell.value.target)
      .reduce((result, current) => result += current ? 1 : 0);

    this.opened = true;
    return true;
  }

  getSymbol(x, y) {
    if (this.opened || !BlackBox.isInBox(x, y)) {
      const value = this.getValue(x, y);

      for (const symbol in constant.cell.value) {
        if (value === constant.cell.value[symbol]) {
          return symbol;
        }
      }

      return null;
    } else {
      return this.isConjectured(x, y) ? 'conjecture' : null;
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
      this.box[y][x] |= value;
    }
  }

  isRaderEnabled() {
    return !this.opened && this.raderCount < BlackBox.RADERS;
  }

  isConjectured(x, y) {
    return this.conjectures.some(value => value.x === x && value.y === y);
  }

  isOpened() {
    return this.opened;
  }
}

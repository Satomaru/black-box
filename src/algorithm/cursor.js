export class Cursor {

  static get GO_DOWN() {
    return 0;
  }

  static get GO_LEFT() {
    return 1;
  }

  static get GO_UP() {
    return 2;
  }

  static get GO_RIGHT() {
    return 3;
  }

  constructor(boxSize) {
    this.boxSize = boxSize;
  }

  readyOnTop(index) {
    this.x = index;
    this.y = -1;
    this.dir = Cursor.GO_DOWN;
  }

  readyOnRight(index) {
    this.x = this.boxSize + 2;
    this.y = index;
    this.dir = Cursor.GO_LEFT;
  }

  readyOnBottom(index) {
    this.x = index;
    this.y = this.boxSize + 2;
    this.dir = Cursor.GO_UP;
  }

  readyOnLeft(index) {
    this.x = -1;
    this.y = index;
    this.dir = Cursor.GO_RIGHT;
  }

  move() {
    switch (this.dir) {
      case Cursor.GO_DOWN:  ++this.y; break;
      case Cursor.GO_LEFT:  --this.x; break;
      case Cursor.GO_UP:    --this.y; break;
      case Cursor.GO_RIGHT: ++this.x; break;
    }
  }

  drawShotIn(callback) {
    callback(this.x, this.y, 2**this.dir);
  }

  drawShotOut(callback) {
    callback(this.x, this.y, 2**((this.dir + 2) % 4));
  }

  lookLeft(callback) {
    switch (this.dir) {
      case Cursor.GO_DOWN:  return callback(this.x + 1, this.y + 1);
      case Cursor.GO_LEFT:  return callback(this.x - 1, this.y + 1);
      case Cursor.GO_UP:    return callback(this.x - 1, this.y - 1);
      case Cursor.GO_RIGHT: return callback(this.x + 1, this.y - 1);
    }
  }

  lookCenter(callback) {
    switch (this.dir) {
      case Cursor.GO_DOWN:  return callback(this.x,     this.y + 1);
      case Cursor.GO_LEFT:  return callback(this.x - 1, this.y    );
      case Cursor.GO_UP:    return callback(this.x,     this.y - 1);
      case Cursor.GO_RIGHT: return callback(this.x + 1, this.y    );
    }
  }

  lookRight(callback) {
    switch (this.dir) {
      case Cursor.GO_DOWN:  return callback(this.x - 1, this.y + 1);
      case Cursor.GO_LEFT:  return callback(this.x - 1, this.y - 1);
      case Cursor.GO_UP:    return callback(this.x + 1, this.y - 1);
      case Cursor.GO_RIGHT: return callback(this.x + 1, this.y + 1);
    }
  }

  turnRight() {
    this.dir = (this.dir + 1) % 4;
  }

  turnLeft() {
    this.dir = (this.dir + 3) % 4;
  }
}

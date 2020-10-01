export const utils = {

  array: (target) => ({
    loop2d: (callback) => target.forEach((row, y) =>
      row.forEach((cell, x) => callback(x, y, cell))
    )
  }),

  line: (length) => ({
    make: (valueOrFunction) => {
      const line = Array(length);

      if (typeof valueOrFunction === 'function') {
        return line.fill().map((value, index) => valueOrFunction(index));
      }

      if (valueOrFunction !== undefined) {
        return line.fill(valueOrFunction);
      } else {
        return line.fill();
      }
    }
  }),

  rect: (width, height) => ({
    make: (valueOrFunction) => {
      return utils.line(height).make((y) => {
        let cellSupplier = valueOrFunction;

        if (typeof valueOrFunction === 'function') {
          cellSupplier = (x) => valueOrFunction(x, y);
        }

        return utils.line(width).make(cellSupplier);
      });
    }
  }),

  square: (size) => ({
    make: (valueOrFunction) => {
      return utils.rect(size, size).make(valueOrFunction);
    }
  }),

  random: (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
};

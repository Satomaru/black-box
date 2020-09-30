export const utils = {

  allocLine: (length) => {
    return {
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
    };
  },

  allocRect: (width, height) => {
    return {
      make: (valueOrFunction) => {
        return Array(height).fill().map((row, y) => {
          let cellSupplier = valueOrFunction;

          if (typeof valueOrFunction === 'function') {
            cellSupplier = (x) => valueOrFunction(x, y);
          }

          return utils.allocLine(width).make(cellSupplier);
        });
      }
    };
  },

  allocSquare: (size) => {
    return {
      make: (valueOrFunction) => {
        return utils.allocRect(size, size).make(valueOrFunction);
      }
    };
  },

  random: (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
};

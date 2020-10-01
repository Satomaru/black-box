import React from 'react';
import ReactDOM from 'react-dom';
import * as deepcopy from 'deepcopy';

import './app.css';
import { BlackBox } from './algorithm/blackbox';
import { Board } from './component/board.jsx';
import { utils } from './utils';

class App extends React.Component {

  constructor(prop) {
    super(prop);
    this.blackbox = new BlackBox();
    this.init();
  }

  init() {
    this.blackbox.init();

    this.state = {
      board: {
        box: {
          className: 'closed',
          cells: utils.square(BlackBox.REGION).make((x, y) => {
           if (BlackBox.isInBox(x, y)) {
              return {
                value: this.blackbox.getSymbol(x, y),
                className: 'inner',
                onClick: () => this.handleClickBox(x, y)
              };
            } else {
              return {
                className: 'outer'
              };
            }
          })
        },
        rader: {
          top: {
            className: 'vertical',
            cells: utils.line(BlackBox.SIZE).make((index) => ({
              onClick: () => this.handleClickRader('top', index)
            }))
          },
          right: {
            className: 'horizontal',
            cells: utils.line(BlackBox.SIZE).make((index) => ({
              onClick: () => this.handleClickRader('right', index)
            }))
          },
          bottom: {
            className: 'vertical',
            cells: utils.line(BlackBox.SIZE).make((index) => ({
              onClick: () => this.handleClickRader('bottom', index)
            }))
          },
          left: {
            className: 'horizontal',
            cells: utils.line(BlackBox.SIZE).make((index) => ({
              onClick: () => this.handleClickRader('left', index)
            }))
          }
        },
        button: {
          open: {
            onClick: () => this.handleClickOpen()
          }
        }
      }
    };
  }

  render() {
    return (
      <div>
        <Board context={this.state.board}/>
      </div>
    );
  }

  handleClickRader(raderName, raderIndex) {
    const result = this.blackbox.shootRader(raderName, raderIndex);

    if (!result) {
      return;
    }

    const state = deepcopy(this.state);

    const updateCell = (name, index) => {
      const cell = state.board.rader[name].cells[index];
      cell.value = this.blackbox.raderIndex;
      cell.disabled = true;
    };

    updateCell(raderName, raderIndex);

    if (result.penetrated) {
      updateCell(result.name, result.index);
    }

    utils.array(state.board.box.cells).loop2d((x, y, cell) =>
      cell.value = this.blackbox.getSymbol(x, y)
    );

    this.setState(state);
  }

  handleClickBox(x, y) {
    if (!this.blackbox.turnConjecture(x, y)) {
      return;
    }

    const state = deepcopy(this.state);
    state.board.box.cells[y][x].value = this.blackbox.getSymbol(x, y);
    this.setState(state);
  }

  handleClickOpen() {
    if (!this.blackbox.open()) {
      return;
    }

    const state = deepcopy(this.state);
    state.board.box.className = 'opened';

    utils.array(state.board.box.cells).loop2d((x, y, cell) => {
      if (BlackBox.isInBox(x, y) && this.blackbox.isConjectured(x, y)) {
        cell.className = "inner conjectured";
      }

      cell.value = this.blackbox.getSymbol(x, y);
    });

    this.setState(state);
  }
}

ReactDOM.render(<App/>, document.getElementById('root'));

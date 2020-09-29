import React from 'react';
import ReactDOM from 'react-dom';
import * as deepcopy from 'deepcopy';

import './app.css';
import { BlackBox } from './algorithm/blackbox';
import { Board } from './component/board.jsx';

class App extends React.Component {

  constructor(prop) {
    super(prop);

    this.blackbox = new BlackBox();

    this.state = {
      board: {
        box: {
          className: 'open',
          cells: Array(10).fill().map((row, y) =>
            Array(10).fill().map((cell, x) => {
              if (BlackBox.isInner(x, y)) {
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
          )
        },
        rader: {
          top: {
            className: 'vertical',
            cells: Array(8).fill().map((value, index) => ({
             onClick: () => this.handleClickRader('top', index)
            }))
          },
          right: {
            className: 'horizontal',
            cells: Array(8).fill().map((value, index) => ({
             onClick: () => this.handleClickRader('right', index)
            }))
          },
          bottom: {
            className: 'vertical',
            cells: Array(8).fill().map((value, index) => ({
             onClick: () => this.handleClickRader('bottom', index)
            }))
          },
          left: {
            className: 'horizontal',
            cells: Array(8).fill().map((value, index) => ({
             onClick: () => this.handleClickRader('left', index)
            }))
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
    if (!this.blackbox.isRaderEnable()) {
      return;
    }

    const state = deepcopy(this.state);
    const result = this.blackbox.shootRader(raderName, raderIndex);

    const updateCell = (name, index) => {
      const cell = state.board.rader[name].cells[index];
      cell.value = this.blackbox.raderIndex;
      cell.disabled = true;
    };

    updateCell(raderName, raderIndex);

    if (result) {
      updateCell(result.name, result.index);
    }

    state.board.box.cells.forEach((row, y) => row.forEach((cell, x) =>
      cell.value = this.blackbox.getSymbol(x, y)));

    this.setState(state);
  }

  handleClickBox(x, y) {
//    const state = deepcopy(this.state);
//    const cell = state.board.box.cells[y][x];
//    cell.value = (cell.value) ? null : '✔︎';
//    this.setState(state);
  }
}

ReactDOM.render(<App/>, document.getElementById('root'));

import React from 'react';
import ReactDOM from 'react-dom';
import * as deepcopy from 'deepcopy';
import './app.css';
import config from './app.config.json';
import { Board } from './component/board.jsx';

export class BlackBox extends React.Component {
  constructor(prop) {
    super(prop);

    this.state = {
      board: {
        box: {
          size: config.box.size,
          cells: Array(config.box.size + 2).fill().map((row, y) =>
            Array(config.box.size + 2).fill().map((col, x) => {
              const inner = (x > 0 && x < config.box.size + 1 && y > 0 && y < config.box.size + 1);

              return {
                className: (inner) ? 'inner' : 'outer',
                disabled: !inner,
                onClick: () => this.handleClickBox(x, y)
              };
            })
          )
        },
        rader: {
          top: {
            cells: Array(config.box.size).fill().map((value, index) => ({
              onClick: () => this.handleClickRaderTop(index)
            }))
          },
          right: {
            cells: Array(config.box.size).fill().map((value, index) => ({
              onClick: () => this.handleClickRaderRight(index)
            }))
          },
          bottom: {
            cells: Array(config.box.size).fill().map((value, index) => ({
              onClick: () => this.handleClickRaderBottom(index)
            }))
          },
          left: {
            cells: Array(config.box.size).fill().map((value, index) => ({
              onClick: () => this.handleClickRaderLeft(index)
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

  handleClickBox(x, y) {
    const state = deepcopy(this.state);
    const cell = state.board.box.cells[y][x];
    cell.value = (cell.value) ? null : '✔︎';
    this.setState(state);
  }

  handleClickRaderTop(index) {
    const state = deepcopy(this.state);
    const cell = state.board.rader.top.cells[index];
    cell.value = (cell.value) ? null : '1';
    this.setState(state);
  }

  handleClickRaderRight(index) {
    const state = deepcopy(this.state);
    const cell = state.board.rader.right.cells[index];
    cell.value = (cell.value) ? null : '1';
    this.setState(state);
  }

  handleClickRaderBottom(index) {
    const state = deepcopy(this.state);
    const cell = state.board.rader.bottom.cells[index];
    cell.value = (cell.value) ? null : '1';
    this.setState(state);
  }

  handleClickRaderLeft(index) {
    const state = deepcopy(this.state);
    const cell = state.board.rader.left.cells[index];
    cell.value = (cell.value) ? null : '1';
    this.setState(state);
  }
}

ReactDOM.render(<BlackBox/>, document.getElementById('root'));

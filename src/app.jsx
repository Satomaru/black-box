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
    this.state = this.createNewState();
  }

  createNewState() {
    this.blackbox.init();

    return {
      board: {
        box: {
          className: 'closed',
          cells: utils.square(BlackBox.REGION).make((x, y) => {
            if (BlackBox.isInBox(x, y)) {
              return {
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
        raders: {
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
        buttons: {
          open: {
            onClick: () => this.handleClickOpen()
          }
        },
        info: {
          targets: BlackBox.TARGETS,
          raders: BlackBox.RADERS,
          gameOver: false,
          score: 0
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
      const cell = state.board.raders[name].cells[index];
      cell.value = this.blackbox.raderIndex;
      cell.disabled = true;
    };

    updateCell(raderName, raderIndex);

    if (result.penetrated) {
      updateCell(result.name, result.index);
    }

    utils.array(state.board.box.cells).forEach2d((x, y, cell) =>
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
    state.board.info.gameOver = true;
    state.board.info.score = this.blackbox.score;

    utils.array(state.board.box.cells).forEach2d((x, y, cell) => {
      if (BlackBox.isInBox(x, y) && this.blackbox.isConjectured(x, y)) {
        cell.className = "inner conjectured";
      }

      cell.value = this.blackbox.getSymbol(x, y);
    });

    this.setState(state);
  }
}

ReactDOM.render(<App/>, document.getElementById('root'));

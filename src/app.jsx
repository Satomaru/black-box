import React from 'react';
import ReactDOM from 'react-dom';
import * as deepcopy from 'deepcopy';

import './app.css';
import { BlackBox } from './algorithm/blackbox';
import { Board } from './component/board.jsx';
import { Debug } from './component/debug.jsx';
import { Info } from './component/info.jsx';
import { utils } from './utils';

class App extends React.Component {

  constructor(prop) {
    super(prop);
    this.blackbox = new BlackBox();
    this.peekMode = false;
    this.state = this.createNewState();
  }

  createNewState(preset) {
    this.blackbox.init(preset);

    return {
      debugMode: false,
      board: {
        gameOver: false,
        score: 0,
        box: {
          className: 'closed',
          cells: utils.square(BlackBox.REGION).make((x, y) => {
            if (BlackBox.isInBox(x, y)) {
              return {
                className: 'inner',
                mark: 0,
                onClick: () => this.handleClickBox(x, y),
                onMark: (mark) => this.handleMarkBox(x, y, mark),
                onClearAllMarks: () => this.handleClearAllMarks()
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
        }
      },
      info: {
        targets: BlackBox.TARGETS,
        raders: BlackBox.RADERS
      },
      debug: {
        buttons: {
          preset: {
            onClick: (name) => this.handleClickPreset(name)
          },
          beginPeek: {
            onClick: () => this.handleClickPeek(true)
          },
          endPeek: {
            onClick: () => this.handleClickPeek(false)
          }
        }
      }
    };
  }

  render() {
    let bottomPane;

    if (this.state.debugMode) {
      bottomPane = <Debug context={this.state.debug}/>;
    } else {
      bottomPane = <Info context={this.state.info}/>;
    }

    return (
      <div className="app">
        <h1 onDoubleClick={(event) => this.handleDoubleClickH1(event)}>Black Box</h1>
        <Board context={this.state.board}/>
        <hr/>
        {bottomPane}
      </div>
    );
  }

  handleClickRader(raderName, raderIndex) {
    const result = this.blackbox.shootRader(raderName, raderIndex);

    if (!result) {
      return;
    }

    const state = deepcopy(this.state);
    this.updateRaderCell(state, raderName, raderIndex);

    if (result.penetrated) {
      this.updateRaderCell(state, result.name, result.index);
    }

    this.updateBoxCells(state);
    this.setState(state);
  }

  handleClickBox(x, y) {
    if (!this.blackbox.turnConjecture(x, y)) {
      return;
    }

    const state = deepcopy(this.state);
    this.updateBoxCell(state, x, y);
    this.setState(state);
  }

  handleMarkBox(x, y, mark) {
    if (this.blackbox.isOpened()) {
      return;
    }

    const state = deepcopy(this.state);
    state.board.box.cells[y][x].mark = mark;
    this.setState(state);
  }

  handleClearAllMarks() {
    if (this.blackbox.isOpened()) {
      return;
    }

    const state = deepcopy(this.state);

    utils.square(BlackBox.REGION).forEach((x, y) => {
      if (BlackBox.isInBox(x, y)) {
        state.board.box.cells[y][x].mark = 0;
      }
    });

    this.setState(state);
  }

  handleClickOpen() {
    if (!this.blackbox.open()) {
      return;
    }

    const state = deepcopy(this.state);
    state.board.box.className = 'opened';
    state.board.gameOver = true;
    state.board.score = this.blackbox.score;
    this.updateBoxCells(state);
    this.setState(state);
  }

  handleDoubleClickH1(event) {
    if (event.shiftKey && event.altKey) {
      this.setState({ debugMode: !this.state.debugMode });
    }
  }

  handleClickPreset(name) {
    if (!name) {
      return;
    }

    fetch('/preset/' + name)
      .then(response => response.json())
      .then(preset => this.setState(this.createNewState(preset)))
      .catch(error => window.alert(error.message));
  }

  handleClickPeek(begin) {
    if (this.blackbox.isOpened()) {
      return;
    }

    this.peekMode = begin;
    const state = deepcopy(this.state);
    state.board.box.className = begin ? 'peeking' : 'closed';
    this.updateBoxCells(state);
    this.setState(state);
  }

  updateRaderCell(state, raderName, raderIndex) {
    const cell = state.board.raders[raderName].cells[raderIndex];
    cell.value = this.blackbox.raderIndex;
    cell.disabled = true;
  }

  updateBoxCells(state) {
    utils.square(BlackBox.REGION).forEach(
      (x, y) => this.updateBoxCell(state, x, y)
    );
  }

  updateBoxCell(state, x, y) {
    const cell = state.board.box.cells[y][x];

    if (this.blackbox.isOpened() || this.peekMode) { 
      if (BlackBox.isInBox(x, y)) {
        cell.className = this.blackbox.isConjectured(x, y) ? "inner conjectured" : "inner";
      }

      cell.value = this.blackbox.getSymbolWhenOpen(x, y);
    } else {
      cell.value = this.blackbox.getSymbol(x, y);
    }
  }
}

ReactDOM.render(<App/>, document.getElementById('root'));

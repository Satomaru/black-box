import React from 'react';
import { Box } from './box.jsx';
import { Rader } from './rader.jsx';

export class Board extends React.Component {

  render() {
    const context = this.props.context;
    let result;

    if (context.gameOver) {
      result = <span>ゲーム終了。スコアは<em>{context.score}</em>点です。</span>;
    }

    return (
      <div className="board">
        <div className="desk">
          <Rader context={context.raders.top}/>
          <div className="desk-body">
            <Rader context={context.raders.left}/>
            <Box context={context.box}/>
            <Rader context={context.raders.right}/>
          </div>
          <Rader context={context.raders.bottom}/>
        </div>
        <p className="footer">
          <button onClick={context.buttons.open.onClick}>Open</button> {result}
        </p>
      </div>
    );
  }
}

import React from 'react';
import { Box } from './box.jsx';
import { Rader } from './rader.jsx';

export class Board extends React.Component {

  render() {
    const context = this.props.context;

    return (
      <div className="board">
        <Rader context={context.rader.top}/>
        <div className="board-body">
          <Rader context={context.rader.left}/>
          <Box context={context.box}/>
          <Rader context={context.rader.right}/>
        </div>
        <Rader context={context.rader.bottom}/>
        <div className="footer">
          <button onClick={context.button.open.onClick}>Open</button>
        </div>
      </div>
    );
  }
}

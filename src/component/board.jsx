import React from 'react';
import { Box } from './box.jsx';
import { RaderV, RaderH } from './rader.jsx';

export class Board extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const context = this.props.context;

    return (
      <div className="board">
        <RaderV context={context.rader.top}/>
        <div className="board-body">
          <RaderH context={context.rader.left}/>
          <Box context={context.box}/>
          <RaderH context={context.rader.right}/>
        </div>
        <RaderV context={context.rader.bottom}/>
      </div>
    );
  }
}

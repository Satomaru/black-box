import React from 'react';
import { Cell } from './cell.jsx';

export class Box extends React.Component {

  render() {
    const context = this.props.context;
    let className = 'box';
    const cells = [];

    if (context.className) {
      className += ' ' + context.className;
    }

    for (const row of context.cells) {
      for (const cell of row) {
        cells.push(<Cell context={cell}/>);
      }
    }

    return (
      <div className={className}>
        {cells}
      </div>
    );
  }
}

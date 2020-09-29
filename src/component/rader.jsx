import React from 'react';
import { Cell } from './cell.jsx';

export class Rader extends React.Component {

  render() {
    const context = this.props.context;
    let className = 'rader';
    const cells = [];

    if (context.className) {
      className += ' ' + context.className;
    }

    for (const cell of context.cells) {
      cells.push(<Cell context={cell}/>);
    }

    return (
      <div className={className}>
        {cells}
      </div>
    );
  }
}

import React from 'react';
import { Cell } from './cell.jsx';

export class Rader extends React.Component {
  constructor(props, className) {
    super(props);
    this.className = className;
  }

  render() {
    const context = this.props.context;
    const cells = [];

    if (context && context.cells) {
      for (const cell of context.cells) {
        cells.push(<Cell context={cell}/>);
      }
    }

    return <div className={this.className}>{cells}</div>;
  }
}

export class RaderV extends Rader {
  constructor(props) {
    super(props, 'rader vertical');
  }
}

export class RaderH extends Rader {
  constructor(props) {
    super(props, 'rader horizontal');
  }
}

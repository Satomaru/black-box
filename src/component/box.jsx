import React from 'react';
import { Cell } from './cell.jsx';

export class Box extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const context = this.props.context;
    const cells = [];
    const style = {};

    if (context && context.cells) {
      style.width = `calc(40px * ${context.size + 2})`;

      for (const row of context.cells) {
        for (const cell of row) {
          cells.push(<Cell context={cell}/>);
        }
      }
    }

    return <div className="box" style={style}>{cells}</div>;
  }
}

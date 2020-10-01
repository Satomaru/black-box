import React from 'react';

class Cell extends React.Component {

  render() {
    const context = this.props.context;
    let onClick;

    if (!context.disabled) {
      onClick = context.onClick;
    }

    return (
      <div className="cell" onClick={onClick}>
        {context.value}
      </div>
    );
  }
}

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

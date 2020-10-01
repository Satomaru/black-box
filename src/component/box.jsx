import React from 'react';

class Cell extends React.Component {

  render() {
    const context = this.props.context;
    let className = 'cell';
    let onClick;
    let value;
    
    if (context.className) {
      className += ' ' + context.className;
    }

    if (!context.disabled) {
      onClick = context.onClick;
    }

    switch (context.value) {
      case 'rader_v':    value = <span className="rader">┃</span>; break;
      case 'rader_h':    value = <span className="rader">━</span>; break;
      case 'rader_u':    value = <span className="rader">＊</span>; break;
      case 'rader_r':    value = <span className="rader">＊</span>; break;
      case 'rader_d':    value = <span className="rader">＊</span>; break;
      case 'rader_l':    value = <span className="rader">＊</span>; break;
      case 'rader_ur':   value = <span className="rader">┗</span>; break;
      case 'rader_ul':   value = <span className="rader">┛</span>; break;
      case 'rader_dr':   value = <span className="rader">┏</span>; break;
      case 'rader_dl':   value = <span className="rader">┓</span>; break;
      case 'rader_cr':   value = <span className="rader">╋</span>; break;
      case 'target':     value = <span>💎</span>; break;
      case 'conjecture': value = <span>✅</span>; break;
    }

    return (
      <div className={className} onClick={onClick}>
        {value}
      </div>
    );
  }
}

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

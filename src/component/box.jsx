import React from 'react';
import raderV from '../../public/images/rader_v.png';
import raderH from '../../public/images/rader_h.png';
import raderU from '../../public/images/rader_u.png';
import raderR from '../../public/images/rader_r.png';
import raderD from '../../public/images/rader_d.png';
import raderL from '../../public/images/rader_l.png';
import raderUR from '../../public/images/rader_ur.png';
import raderUL from '../../public/images/rader_ul.png';
import raderDR from '../../public/images/rader_dr.png';
import raderDL from '../../public/images/rader_dl.png';
import raderCr from '../../public/images/rader_cr.png';
import target from '../../public/images/target.png';
import conjecture from '../../public/images/conjecture.png';

class Cell extends React.Component {

  render() {
    const context = this.props.context;
    let className = 'cell';
    let onClick;
    let value;

    if (context.mark !== undefined) {
      className += ' mark' + context.mark;
    }

    if (context.className) {
      className += ' ' + context.className;
    }

    if (!context.disabled) {
      onClick = context.onClick;
    }

    switch (context.value) {
      case 'rader_v':    value = <img src={raderV}/>; break;
      case 'rader_h':    value = <img src={raderH}/>; break;
      case 'rader_u':    value = <img src={raderU}/>; break;
      case 'rader_r':    value = <img src={raderR}/>; break;
      case 'rader_d':    value = <img src={raderD}/>; break;
      case 'rader_l':    value = <img src={raderL}/>; break;
      case 'rader_ur':   value = <img src={raderUR}/>; break;
      case 'rader_ul':   value = <img src={raderUL}/>; break;
      case 'rader_dr':   value = <img src={raderDR}/>; break;
      case 'rader_dl':   value = <img src={raderDL}/>; break;
      case 'rader_cr':   value = <img src={raderCr}/>; break;
      case 'target':     value = <img src={target}/>; break;
      case 'conjecture': value = <img src={conjecture}/>; break;
    }

    return (
      <div
        className={className}
        onClick={onClick}
        onContextMenu={(event) => this.handleContextMenu(event)}
        onMouseEnter={(event) => this.handleMouseEnter(event)}>

        {value}
      </div>
    );
  }

  handleContextMenu(event) {
    event.preventDefault();
    this.handleMark(event);
  }

  handleMouseEnter(event) {
    if (event.button === 2) {
      this.handleMark(event);
    }
  }

  handleMark(event) {
    const mark = event.shiftKey ? 0 : 1;
    this.props.context.onMark(mark);
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

import React from 'react';
import raderV from '../../public/rader_v.png';
import raderH from '../../public/rader_h.png';
import raderU from '../../public/rader_u.png';
import raderR from '../../public/rader_r.png';
import raderD from '../../public/rader_d.png';
import raderL from '../../public/rader_l.png';
import raderUR from '../../public/rader_ur.png';
import raderUL from '../../public/rader_ul.png';
import raderDR from '../../public/rader_dr.png';
import raderDL from '../../public/rader_dl.png';
import raderCr from '../../public/rader_cr.png';
import target from '../../public/target.png';
import conjecture from '../../public/conjecture.png';

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

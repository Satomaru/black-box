import React from 'react';

export class Cell extends React.Component {

  render() {
    const context = this.props.context;

    if (context) {
      return (
        <button
          className={'cell ' + context.className}
          disabled={context.disabled}
          onClick={context.onClick}>

          {context.value}
       </button>
      );
    } else {
      return <button className="cell"></button>;
    }
  }
}

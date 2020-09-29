import React from 'react';

export class Cell extends React.Component {

  render() {
    const context = this.props.context;
    let className = 'cell';
    let onClick;

    if (context.className) {
      className += ' ' + context.className;
    }

    if (!context.disabled) {
      onClick = context.onClick;
    }

    return (
      <div className={className} onClick={onClick}>
        {context.value}
      </div>
    );
  }
}

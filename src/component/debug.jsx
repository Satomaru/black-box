import React from 'react';

export class Debug extends React.Component {

  constructor(props) {
    super(props);
    this.preset = "";
  }

  render() {
    const context = this.props.context;
    
    return (
      <p>
        <div>
          <select onChange={(event) => this.preset = event.target.value}>
            <option value="">(choose preset)</option>
            <option value="for_demo">For demo</option>
          </select>
          <button onClick={() => context.buttons.preset.onClick(this.preset)}>
            Start with preset
          </button>
        </div>

        <div>
          <button onClick={() => context.buttons.beginPeek.onClick()}>Begin peek</button>
          <button onClick={() => context.buttons.endPeek.onClick()}>End peek</button>
        </div>
      </p>
    );
  }
}

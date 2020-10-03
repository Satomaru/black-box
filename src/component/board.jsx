import React from 'react';
import { Box } from './box.jsx';
import { Rader } from './rader.jsx';

export class Board extends React.Component {

  render() {
    const context = this.props.context;
    let result;

    if (context.info.gameOver) {
      result = `ゲーム終了。スコアは ${context.info.score} 点です。`;
    }

    return (
      <div className="board">
        <Rader context={context.raders.top}/>
        <div className="board-body">
          <Rader context={context.raders.left}/>
          <Box context={context.box}/>
          <Rader context={context.raders.right}/>
        </div>
        <Rader context={context.raders.bottom}/>
        <div className="footer">
          <button onClick={context.buttons.open.onClick}>Open</button>
        </div>
        <div className="footer">
          箱の中にはターゲットが {context.info.targets} 個あります。<br/>
          レーダーは {context.info.raders} 回照射できます。<br/>
          {result}<br/>
       </div>
     </div>
    );
  }
}

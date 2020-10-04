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
        <div className="desk">
          <Rader context={context.raders.top}/>
          <div className="desk-body">
            <Rader context={context.raders.left}/>
            <Box context={context.box}/>
            <Rader context={context.raders.right}/>
          </div>
          <Rader context={context.raders.bottom}/>
        </div>
        <div className="footer">
          <button onClick={context.buttons.open.onClick}>Open</button> {result}<br/>
          <br/>
          中央の箱の中には、ターゲットが {context.info.targets} 個隠されています。<br/>
          ターゲットの位置を予測してタップしてください。<br/>
          上下左右の領域をタップすると、{context.info.raders} 回までレーダーを照射できます。<br/>
          マウスを使用している場合、右クリックで色が変わります。<br/>
          ゲーム上の意味はありませんが、考察に役立ててください。<br/>
          Open ボタンをタップすると、答え合わせを行います。<br/>
        </div>
      </div>
    );
  }
}

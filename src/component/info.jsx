import React from 'react';

export class Info extends React.Component {

  render() {
    const context = this.props.context;

    return (
      <div className="info">
        中央の箱の中には、ターゲットが {context.targets} 個隠されています。<br/>
        ターゲットの位置を予測してタップしてください。<br/>
        上下左右の領域をタップすると、{context.raders} 回までレーダーを照射できます。<br/>
        マウスを使用している場合、右クリックで色が変わります。<br/>
        ゲーム上の意味はありませんが、考察に役立ててください。<br/>
        Open ボタンをタップすると、答え合わせを行います。<br/>
        再度ゲームを開始する時は、ブラウザをリロードしてください。<br/>
      </div>
    );
  }
}

import React from 'react';
import raders from '../../public/images/raders.png';

export class Info extends React.Component {

  render() {
    const context = this.props.context;

    return (
      <div>
        <h2>遊び方</h2>

        <p>
          中央の箱の中には、ターゲットが {context.targets} 個隠されています。<br/>
          ターゲットの位置を予測してタップしてください。<br/>
          上下左右の領域をタップすると、{context.raders} 回までレーダーを照射できます。<br/>
          マウスを使用している場合、右クリックで色が変わります。<br/>
          ゲーム上の意味はありませんが、考察に役立ててください。<br/>
          Open ボタンをタップすると、答え合わせを行います。<br/>
          再度ゲームを開始する時は、ブラウザをリロードしてください。<br/>
        </p>

        <h2>レーダーの挙動</h2>

        <p>
          <img src={raders} width="408px"/>
        </p>

        <p>
          1番と2番は、ターゲットに反射して箱を貫通するケースです。<br/>
          ターゲットの横に接触した場合は、反対側に屈折します。<br/>
          この挙動がターゲットの予測において一番参考になります。<br/>
        </p>

        <p>
          3番と4番は、箱の中で消失するケースです。<br/>
          正面から接触するか、右と左に同時に接触した場合は、<br/>
          消失します。<br/>
        </p>

        <p>
          5番と6番は、レーダーが箱に入れずに消失するケースです。<br/>
          箱に入る前に接触した場合は、消失します。<br/>
        </p>
      </div>
    );
  }
}

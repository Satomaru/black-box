black-box
=========

play.jsでReactが使えるらしく、私は今までReactを使ってなかったので、これを機会に触ってみることにしました。

__BlackBox__ という名前のパズルゲームです。iOSアプリ
[play.js](https://apps.apple.com/jp/app/play-js-javascript-ide/id1423330822)
上で動作します。

clone時の注意
------------

このプロジェクトをcloneする時は、
New ProjectダイアログのTypeに `Node.js + React.js (Template)` を指定してください。

遊び方
-----

実際にプレイしながら説明します。

<img src="https://github.com/Satomaru/black-box/blob/master/misc/tutorial-01.png" width="480px">

これがスタート時の画面です。
中央にある灰色の箱がブラックボックスで、この中のどこかにターゲットが4つ隠されてます。それを探し出しましょう。
上下左右にある青色の棒がレーダー装置です。10回までレーダーを照射できます。このレーダーでターゲットを探していきます。

---

<img src="https://github.com/Satomaru/black-box/blob/master/misc/tutorial-02.png" width="480px">

まず、左の一番上をタップしてレーダーを照射しました（1）。
すると、上の一番左に貫通しました。
箱を貫通した場合、貫通した場所に、照射した番号と同じ番号が記載されます。

---

<img src="https://github.com/Satomaru/black-box/blob/master/misc/tutorial-03.png" width="480px">

ターゲットがありそうな場所を予想して、その場所をタップしてチェックマークを表示させました。
なぜここを予想したのかについては、後述の __レーダーの挙動解説__ を参考にしてください。

---

<img src="https://github.com/Satomaru/black-box/blob/master/misc/tutorial-04.png" width="480px">

右の一番下から照射しました（2）。
すると、レーダーが消失してしまいました。
レーダーが箱に入る前にターゲットに触れてしまうと、検知することができすに、このように消失します。

---

<img src="https://github.com/Satomaru/black-box/blob/master/misc/tutorial-05.png" width="480px">

右の中程から照射しました（3）。
すると、まっすぐ左に貫通しました。

---

<img src="https://github.com/Satomaru/black-box/blob/master/misc/tutorial-06.png" width="480px">

右の一番上から照射しました（4）。
すると、上に貫通しました。

---

<img src="https://github.com/Satomaru/black-box/blob/master/misc/tutorial-07.png" width="480px">

4番の照射から、2つ目のターゲットを予測します。

---

<img src="https://github.com/Satomaru/black-box/blob/master/misc/tutorial-08.png" width="480px">

下の左寄りの場所から照射しました（5）。
すると、左に貫通しました。

---

<img src="https://github.com/Satomaru/black-box/blob/master/misc/tutorial-09.png" width="480px">

5番の照射から、3つ目のターゲットを予測します。
ちょっとひねくれた予測ですが、気にしないでください（

---

<img src="https://github.com/Satomaru/black-box/blob/master/misc/tutorial-10.png" width="480px">

下の右寄りの場所から照射しました（6）。
すると、左に貫通しました。
しかし、この照射の結果は、これまでの予想に反するものです。

---

<img src="https://github.com/Satomaru/black-box/blob/master/misc/tutorial-11.png" width="480px">

6番の照射から、3つ目のターゲットの予測をやり直します。
また、4つ目のターゲットの予測もできました。
これで4つ全てのターゲットを予測できましたので、
`open` ボタンを押して箱を開け、答え合わせをします。

---

<img src="https://github.com/Satomaru/black-box/blob/master/misc/tutorial-12.png" width="480px">

見事、ターゲットを4つとも当てることができました。
3番の照射が、中々いい感じに意地悪でしたね。
もう一度遊ぶ時は、ページをリロードします。

レーダーの挙動解説
---------------

<img src="https://github.com/Satomaru/black-box/blob/master/misc/rader-detail.png" width="480px">

1番と2番の照射は、ターゲットに反射して箱の外に貫通するケースです。
レーダーは、ターゲットに斜めから接触した場合、ターゲットの反対側に屈折します。
この照射が予測において一番参考になります。

3番、4番、7番の照射は、レーダーが箱に入れずに消失するケースです。
ターゲットが外壁にあり、レーダーが箱に入る前に接触した場合は、このようになります。

5番と6番の照射は、箱の中で消失するケースです。
ターゲットに正面から接触するか、右斜めと左斜めの両方のターゲットに同時に接触した場合は、このようになります。

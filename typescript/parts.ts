/// <reference path="./enchantjs.d.ts" />
/// <reference path="./parts.d.ts" />

class Parts {
    private game;
    setGame(game: Game) {
        this.game = game;
    }
    //ボタンクラス作成
    Button(text: string, color = "#191970"): C_Btn {
        const C_Btn = Class.create(Group, {
            Btn: 0,
            Text: 0,
            initialize: function initialize(text, color) {
                Group.call(this);
                var wi = text.toString(10).length * 20 + 20;
                this.Btn = new Sprite(wi, 50);
                this.Btn.backgroundColor = color;
                this.Btn.opacity = 0.8;
                this.addChild(this.Btn);
                this.Text = new Label(text);
                this.addChild(this.Text);
                this.Text.y = 12;
                this.Text.x = 10;
                this.Text.font = "20px Meiryo";
                this.Text.color = 'rgba(255,255,255, 1)';
            },
            setText: function SetText(_Text) {
                this.childNodes[1].text = _Text;
            },
            setOpacity: function SetOpacity(_Opa) {
                this.Btn.opacity = _Opa;
                this.Text.opacity = _Opa;
            },
            getOpacity: function GetOpacity() {
                return this.Btn.opacity;
            },
            changeColor: function changeColor(color) {
                this.Btn.backgroundColor = color;
            }
        });
        return new C_Btn(text, color);
    }
    Label(text: string, color = "#fff", fontSize = 20) {
        let S_text = new Label(text);
        S_text.font = fontSize + "px 'Meiryo'";
        S_text.width = 380;
        S_text.color = color;
        return S_text;
    }

    LoopSound(): LoopSound {
        //サウンドクラス
        const LoopSound = Class.create(Sprite, {
            Sound: "",
            SFlg: 0,
            game: "",
            initialize: function initialize(_game) {
                var self = this;
                //クラスの初期化(コンストラクタ)
                this.game = _game;
                Sprite.call(this, 0, 0); //スプライトの初期化
                this.SFlg = 0;
                this.game.onenterframe = function () {
                    //enterframeイベントのイベントリスナー
                    if (self.SFlg == 1) {
                        try {
                            if (!self.Sound.src) {
                                self.Sound.play();
                            }
                        } catch (e) { }
                    }
                };
            },
            set: function set(_Sound) {
                try {
                    this.Sound.stop();
                } catch (e) { }

                this.Sound = _Sound;
                this.SFlg = 0;
                this.Sound = this.game.assets[this.Sound];

                try {
                    // サウンドを読み込み
                    if (this.Sound.src) {
                        this.Sound.play();
                        this.Sound.src.loop = true;
                    }
                } catch (e) { }
                this.SFlg = 1;
            },
            stop: function stop() {
                try {
                    this.Sound.stop();
                    this.SFlg = 0;
                } catch (e) { }
            },
            changeVolume: function changeVolume(num: number) {
                this.Sound.volume = num;
            }
        });
        return new LoopSound(this.game);
    }
    TextBound(str, x, y, size, color, maxTime = 40) {
        //テキストバウンドクラス
        var C_BoundText = Class.create(Group, {
            gy: 0,		//バウンドする地面座標px
            ay: 0,		//現在のY軸加速度
            ax: 0,		//1フレームでのX軸の移動px
            maxTime: 60,	//消滅カウント
            WhiteLabel: "",
            Label: "",
            initialize: function initialize(str, x, y, size, color, maxTime) {		//コンストラクタ(表示数字,x,y)
                Group.call(this);
                this.maxTime = maxTime;
                this.Label = new Label(str);		//enchant.jsでは文字表示はLabelオブジェクトを使う。
                this.Label.font = size + "px Meiryo";			//メイリオで表示
                this.Label.color = color;					//赤で表示
                this.x = x;							//引数に現在座標をとる（指定位置に表示させたいので）
                this.y = y;							//同上
                this.ax = Math.random() * 10 - 5;
                this.gy = y + 100 + Math.random() * 50;//バウンド位置は自分の座標+100+0~200分下にする
                this.ay = -20;			//Y軸加速度を0~30で設定する
                this.WhiteLabel = new Label(str);
                this.WhiteLabel.x = -2;
                this.WhiteLabel.y = -1;
                this.WhiteLabel.font = (size + 2) + "px Meiryo";	//メイリオで表示
                this.WhiteLabel.color = "white";					//白で表示

                this.addChild(this.WhiteLabel);
                this.addChild(this.Label);
            },
            onenterframe: function onenterframe() {		//毎フレーム毎に呼び出す処理
                this.y += this.ay;						//ax,ayが加速度なので、現在座標にこの値を毎回足していく
                this.x += this.ax;						//同上			

                this.ay += 2;							//Y軸は重力があるので、↓方向に毎フレーム２を足す
                if (this.gy < this.y) {					//バウンド地面をY座標が越えたら
                    this.ay = -this.ay * 0.8;			//反発係数0.8でバウンド
                    this.y = this.gy;					//Y座標をバウンド地面より上移動
                }
                this.maxTime--;							//消滅用カウント
                if (this.maxTime <= 0) {				//消滅用カウントが０になったら
                    this.parentNode.removeChild(this);	//自分をけす。そして私も消えよう。永遠に・・・！
                    this.clearEventListener("enterframe");
                }
            }
        });
        return new C_BoundText(str, x, y, size, color, maxTime);
    }
    SpriteBound(image, frame, x, y, vx) {
        //テキストバウンドクラス
        var C_SpriteBound = Class.create(Sprite, {
            gy: 0,		//バウンドする地面座標px
            ay: 0,		//現在のY軸加速度
            ax: 0,		//1フレームでのX軸の移動px
            maxTime: 40,	//消滅カウント
            initialize: function initialize(image, frame, x, y, vx) {		//コンストラクタ(表示数字,x,y)
                Sprite.call(this, 40, 40);
                this.image = image;
                this.frame = frame;
                this.x = x;
                this.y = y;
                this.ax = vx / 2;
                this.gy = y + 100 + Math.random() * 50;//バウンド位置は自分の座標+100+0~200分下にする
                this.ay = -20;			//Y軸加速度を0~30で設定する
            },
            onenterframe: function onenterframe() {		//毎フレーム毎に呼び出す処理
                this.y += this.ay;						//ax,ayが加速度なので、現在座標にこの値を毎回足していく
                this.x += this.ax;						//同上			

                this.ay += 2;							//Y軸は重力があるので、↓方向に毎フレーム２を足す
                if (this.gy < this.y) {					//バウンド地面をY座標が越えたら
                    this.ay = -this.ay * 0.8;			//反発係数0.8でバウンド
                    this.y = this.gy;					//Y座標をバウンド地面より上移動
                }
                this.maxTime--;							//消滅用カウント
                if (this.maxTime <= 0) {				//消滅用カウントが０になったら
                    this.parentNode.removeChild(this);	//自分をけす。そして私も消えよう。永遠に・・・！
                }
            }
        });
        return new C_SpriteBound(image, frame, x, y, vx);
    }
    upText(str, x, y, size, color) {
        //テキストバウンドクラス
        var C_upText = Class.create(Group, {
            WhiteLabel: "",
            Label: "",
            initialize: function initialize(str, x, y, size, color) {		//コンストラクタ(表示数字,x,y)
                Group.call(this);

                this.Label = new Label(str);		//enchant.jsでは文字表示はLabelオブジェクトを使う。
                this.Label.font = size + "px Meiryo";			//メイリオで表示
                this.Label.color = color;					//赤で表示
                this.x = x;							//引数に現在座標をとる（指定位置に表示させたいので）
                this.y = y;							//同上
                this.WhiteLabel = new Label(str);
                this.WhiteLabel.x = -2;
                this.WhiteLabel.y = -1;
                this.WhiteLabel.font = (size + 2) + "px Meiryo";	//メイリオで表示
                this.WhiteLabel.color = "white";					//白で表示

                this.addChild(this.WhiteLabel);
                this.addChild(this.Label);
            },
            onenterframe: function onenterframe() {		//毎フレーム毎に呼び出す処理
                this.y -= 1;
                this.Label.opacity -= 0.02;
                this.WhiteLabel.opacity -= 0.02;
                if (this.Label.opacity <= 0.1) {				//消滅用カウントが０になったら
                    this.parentNode.removeChild(this);	//自分をけす。そして私も消えよう。永遠に・・・！
                }
            }
        });
        return new C_upText(str, x, y, size, color);
    }
}

const parts = new Parts();
export default parts;
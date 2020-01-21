/// <reference path="./enchantjs.d.ts" />
import Loader from "./loader";
import parts from "./parts";

enchant();


window.onload = function () {
    const game = new Game(400, 600);
    game.fps = 30;
    const pImgs = Loader.ImageLoader(game);
    const pMscs = Loader.SoundLoader(game);

    let score = 0;

    game.onload = function () {
        const setScene = function (sceneNum: number) {
            const scene = new Scene();
            scene.backgroundColor = "black";
            try {
                game.popScene();
            } catch (e) {
                console.log("it is initial Scene");
            }
            game.pushScene(scene);
            switch (sceneNum) {
                case 0: {
                    const label = parts.Label("");
                    scene.addChild(label);
                    const showLabel = function () {
                        label.text = "point:" + score;
                    }
                    showLabel();
                    const back = new Sprite(100, 100);
                    back.image = game.assets[pImgs[1]];
                    back.moveTo(100, 100);
                    back.time = 0;
                    scene.addChild(back);
                    // 毎フレームで実行するイベントハンドラ
                    back.onenterframe = function () {
                        this.time++;
                        this.x += Math.sin(this.time / 30) * 2;
                        this.y += Math.cos(this.time / 30) * 2;
                    }
                    // クリック時に実行するイベントハンドラ
                    back.ontouchend = function () {
                        game.assets[pMscs[1]].clone().play(); //音を鳴らす
                        score++; // グローバル変数のスコアを１増やす
                        showLabel(); // スコアを反映
                        // MEMO: 作っちゃうおじさん謹製のテキストバウンドモジュールを使用する例
                        const label = parts.TextBound("+1", this.x, this.y, 32, "orange", 60);
                        scene.addChild(label);
                        if (score >= 10) {
                            score = 0;
                            setScene(1);
                        }
                    }
                    break;
                }
                case 1: {
                    const btn = parts.Button("もう一度遊ぶ");
                    btn.moveTo(100, 200);
                    scene.addChild(btn);
                    btn.ontouchend = function () {
                        setScene(0);
                    }
                    break;
                }
            }
        }
        setScene(0);
    }
    game.start();
}

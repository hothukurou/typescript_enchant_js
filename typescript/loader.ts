/// <reference path="./enchantjs.d.ts" />
class Loader {
    private ImageNum = 1;
    private SoundNum = 1;
    ImageLoader(game: Game): string[] {
        let B_Imgs = [];
        B_Imgs[0] = 0;
        for (let i = 1; i <= this.ImageNum; i++) {
            let B_Img = "./image/Img" + i + ".png";
            game.preload([B_Img]);
            B_Imgs[i] = B_Img;
        }
        return B_Imgs;
    }
    SoundLoader(game: Game): string[] {
        var M_Musics = [];
        M_Musics[0] = 0;
        for (let i = 1; i <= this.SoundNum; i++) {
            var M_Music = "./sound/Music" + i + ".mp3";
            game.preload([M_Music]);
            M_Musics[i] = M_Music;
        }
        return M_Musics;
    }
}
const loader = new Loader();
export default loader;
/// <reference path="./enchantjs.d.ts" />

declare class LoopSound {
    set(file: string);
    stop();
    changeVolume(num: number);
}

declare class C_Btn extends EventTargetEnchant {
    constructor(text: string, color: string);
    moveTo(x: number, y: number);
    setText(_Text);
    setOpacity(_Opa);
    getOpacity();
    changeColor(color);
}

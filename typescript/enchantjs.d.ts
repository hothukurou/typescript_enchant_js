declare let enchant: any;

declare class EventTargetEnchant {
    addEventListener(type: string, listener: Function);
    removeEventListener(type: string, listener: Function);
    clearEventListener(type: string);
    dispatchEvent(e: any);
    ontouchstart(e);
    ontouchend(e);
    onenterframe();
    ontouchmove(e);
    on(type: string, listener: Function);
}

declare let Class: any;

declare class Game extends EventTargetEnchant {
    constructor(width: number, height: number);
    actualFps: number;
    constructor();
    start(): void;
    stop(): void;
    pause(): void;
    debug(): void;
    resume(): void;
    assets: any[];
    fps: number;
    onload(): void;
    getElapsedTime(): number;

    // loading
    load(src: string, callback?: Function): void;
    preload(Array): void;
    findExt(path: string): string;

    //scene
    pushScene(scene: Scene);
    popScene();
    replaceScene(scene: Scene);
    removeScene(scene: Scene);
    keybind(key: string, buttons: string);
}
declare class NodeEnchant extends EventTargetEnchant {
    x: number;
    y: number;
    time: number;
    state: number;
    moveTo(x: number, y: number): void;
    moveBy(x: number, y: number): void;
    remove();
    parentNode: _ParentNode;
}

declare class _ParentNode {
    removeChild(node: any);
    addChild(node: any);
}

declare class Entity extends NodeEnchant {
    id: number;
    className: string;
    width: number;
    height: number;
    backgroundColor: string;
    opacity: number;
    visible: boolean;
    touchEnabled: boolean;
    scaleX: number;
    scaleY: number;
    rotation: number;
    _element: any;
    intersect(other: Entity): boolean;
    within(other: Entity, distance: number): boolean;
    scale(x: number, y: number): void;
    rotate(degree: number): void;
}

declare class Sprite extends Entity {
    constructor(width: number, height: number);
    image: any;
    frame: number;
}
declare class Label extends Entity {
    constructor(text: string);
    text: string;
    textAlign: string;
    font: string;
    color: string;
}

declare class Group extends NodeEnchant {
    firstChild: Node;
    lastChild: Node;
    addChild(node): void;
    removeChild(node): void;
    insertBefore(node: Node, reference): void;
}

declare class Scene extends Group {
    backgroundColor: string;
}


declare class Surface extends EventTargetEnchant {
    static load(src: string);
    getPixel(x: number, y: number);
    setPixel(x: number, y: number);
    clear();
    draw(image);
    clone();
    toDataURL();
}
declare class Sound extends EventTargetEnchant {
    static load(src: string);
    play();
    pause();
    stop();
    clone();
    currentTime: number;
    volume: number;
    static load(src: string, type?: string);
}

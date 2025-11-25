import { Container, Sprite, Assets } from "pixi.js";
import { SlotGridMask } from "../pirate-slot/SlotMask";

export class BarrelBoard extends Container {
    private bg!: Sprite;
    public gridContainer!: Container;

    constructor() {
        super();
        this.pivot.set(0.5);
        this.initialize();
    }

    private async initialize() {
        // Load board background
        const boardTexture = await Assets.load("/raw-assets/pirate/Barrel-Board.png");
        this.bg = new Sprite(boardTexture);
        this.bg.anchor.set(0.5);
        this.addChild(this.bg);

        // --- SLOT MASK GRID ---
        const slotMask = new SlotGridMask();
        slotMask.x = 0;
        slotMask.y = 0;
        slotMask.scale.set(0.95); // size fits center beige area

        // GRID CONTAINER
        this.gridContainer = new Container();
        this.gridContainer.addChild(slotMask);
        this.addChild(this.gridContainer);

        this.emit("ready");
    }

    public setScaleByScreen(width: number) {
        if (width <= 425) this.scale.set(0.25);
        else if (width <= 768) this.scale.set(0.3);
        else if (width <= 900) this.scale.set(0.4);
        else if (width <= 1000) this.scale.set(0.5);
        else this.scale.set(0.56);
    }
}

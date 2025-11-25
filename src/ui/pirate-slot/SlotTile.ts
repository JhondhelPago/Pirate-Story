import { Assets, Container, Sprite } from 'pixi.js';

export class SlotTile extends Container {
    private bg!: Sprite;
    private slotIcon!: Sprite;

    private bgPath: string;
    private iconPath: string;

    constructor(bgPath: string, iconPath: string) {
        super();

        this.bgPath = bgPath;
        this.iconPath = iconPath;

        this.init();
    }

    private async init() {
        // --- LOAD BACKGROUND ---
        const bgTexture = await Assets.load(this.bgPath);
        this.bg = new Sprite(bgTexture);
        this.bg.anchor.set(0.5);
        this.addChild(this.bg);

        // --- LOAD ICON ---
        const iconTexture = await Assets.load(this.iconPath);
        this.slotIcon = new Sprite(iconTexture);
        this.slotIcon.anchor.set(0.5);
        this.addChild(this.slotIcon);

        this.emit("loaded");

        // Position everything after textures are ready
        this.layout();
    }

    private layout() {
        // Center the icon on top of the background
        this.slotIcon.x = 0;
        this.slotIcon.y = 0;

        // Optional — auto-fit icon inside the tile
        const scaleFactor = Math.min(
            this.bg.width * 0.6 / this.slotIcon.width,
            this.bg.height * 0.6 / this.slotIcon.height
        );
        this.slotIcon.scale.set(scaleFactor);

    }
}

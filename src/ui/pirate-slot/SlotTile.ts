import { Assets, Container, Sprite } from 'pixi.js';

export class SlotTile extends Container {
    private bg!: Sprite;
    private slotIcon!: Sprite;

    private symbolKey: number;
    private symbolLibrary: Record<number, { bg: string; icon: string }>;

    constructor(
        symbolKey: number,
        symbolLibrary: Record<number, { bg: string; icon: string }>
    ) {
        super();

        this.symbolKey = symbolKey;
        this.symbolLibrary = symbolLibrary;

        this.init();
    }

    private async init() {
        const entry = this.symbolLibrary[this.symbolKey];

        if (!entry) {
            console.warn(`Symbol key ${this.symbolKey} not found in SymbolLibrary`);
            return;
        }

        // --- LOAD BACKGROUND ---
        const bgTexture = await Assets.load(entry.bg);
        this.bg = new Sprite(bgTexture);
        this.bg.anchor.set(0.5);
        this.addChild(this.bg);

        // --- LOAD ICON ---
        const iconTexture = await Assets.load(entry.icon);
        this.slotIcon = new Sprite(iconTexture);
        this.slotIcon.anchor.set(0.5);
        this.addChild(this.slotIcon);

        this.emit("loaded");

        this.layout();
    }

    /** 
     * Change the symbol dynamically 
     */
    public async setSymbolKey(key: number) {
        this.symbolKey = key;

        // Clear current textures
        this.removeChildren();

        // Reload using new key
        await this.init();
    }

    private layout() {
        // Center icon
        this.slotIcon.x = 0;
        this.slotIcon.y = 0;

        // KEEP ORIGINAL SIZE
        this.slotIcon.scale.set(1);
    }
}

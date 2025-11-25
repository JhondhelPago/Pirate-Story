import { Container, Sprite, Assets, Graphics } from "pixi.js";

export class ControllerPanel extends Container {
    private bgBar!: Graphics;

    private menuBtn!: Sprite;
    private infoBtn!: Sprite;
    private settingsBtn!: Sprite;

    private minusBtn!: Sprite;
    private spinBtn!: Sprite;
    private plusBtn!: Sprite;
    private autoplayBtn!: Sprite;

    constructor() {
        super();
        this.init();
    }

    private async init() {
        // ==========================================================
        // BLACK BACKGROUND BAR  (DO NOT REMOVE)
        // ==========================================================
        this.bgBar = new Graphics()
            .rect(0, 0, 1920, 140)  // size adjusted in resize()
            .fill(0x000000, 0.65);  // semi-transparent black

        this.addChild(this.bgBar);

        // ==========================================================
        // BUTTONS
        // ==========================================================
        this.menuBtn = await this.makeBtn("/raw-assets/pirate/buttons/Menu.png");
        this.infoBtn = await this.makeBtn("/raw-assets/pirate/buttons/Info.png");
        this.settingsBtn = await this.makeBtn("/raw-assets/pirate/buttons/Settings.png");

        this.minusBtn = await this.makeBtn("/raw-assets/pirate/buttons/Subtract.png");
        this.spinBtn = await this.makeBtn("/raw-assets/pirate/buttons/Spin.png");
        this.plusBtn = await this.makeBtn("/raw-assets/pirate/buttons/Add.png");
        this.autoplayBtn = await this.makeBtn("/raw-assets/pirate/buttons/AutoPlay.png");

        this.addChild(
            this.menuBtn,
            this.infoBtn,
            this.settingsBtn,
            this.minusBtn,
            this.spinBtn,
            this.plusBtn,
            this.autoplayBtn
        );

        this.resize(window.innerWidth, window.innerHeight);
    }

    private async makeBtn(path: string) {
        const tex = await Assets.load(path);
        const s = new Sprite(tex);
        s.anchor.set(0.5);
        s.scale.set(0.85);
        return s;
    }

    // ==========================================================
    // ★ RESPONSIVE POSITIONING BASED ON DESIGN TEMPLATE ★
    // ==========================================================
    public resize(w: number, h: number) {
    // Background stays
    this.bgBar.width = w;
    this.bgBar.height = 140;

    // Panel positioned at bottom
    this.y = h - 140;

    // center Y inside bar
    const centerY = 140 / 2;

    // ----------------------------------------------------------
    // LEFT SIDE (manual)
    // ----------------------------------------------------------
    this.menuBtn.x = 150; this.menuBtn.y = centerY - 40; this.infoBtn.x = 100 + 100; 
    this.infoBtn.y = centerY; this.settingsBtn.x = 150; 
    this.settingsBtn.y = centerY + 40;

    // ----------------------------------------------------------
    // RIGHT SIDE — FIXED SPACING (based on your screenshot)
    // ----------------------------------------------------------
    const PAD_RIGHT = 150;

    // AUTOPLAY = far right
    this.autoplayBtn.x = w - PAD_RIGHT;
    this.autoplayBtn.y = centerY + 35;

    // minusBtn.x snapped to autoplay
    this.minusBtn.x = this.autoplayBtn.x;
    this.minusBtn.y = centerY - 30;

    // Medium gap between spin and minus (40px)
    const GAP_MED = 15;

    // Large gap between plus and spin (30px)
    const GAP_LARGE = 15;

    // Place spin to the LEFT of minus
    this.spinBtn.x =
        this.minusBtn.x - (this.minusBtn.width / 2) - GAP_MED - (this.spinBtn.width / 2);
    this.spinBtn.y = centerY;

    // Place plus to the LEFT of spin
    this.plusBtn.x =
        this.spinBtn.x - (this.spinBtn.width / 2) - GAP_LARGE - (this.plusBtn.width / 2);
    this.plusBtn.y = centerY - 35;

    }

}

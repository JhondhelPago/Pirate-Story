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
        const isMobile = w <= 768;

        // Background stays
        this.bgBar.width = w;
        this.bgBar.height = isMobile ? 180 : 140;

        // Panel positioned at bottom
        this.y = h - this.bgBar.height;

        const centerY = this.bgBar.height / 2;

        // ============================================================
        // DESKTOP VERSION (landscape, wide screens)
        // ============================================================
        if (!isMobile) {

            // LEFT SIDE (desktop)
            this.menuBtn.x = 150;
            this.menuBtn.y = centerY - 40;

            this.infoBtn.x = 200;
            this.infoBtn.y = centerY;

            this.settingsBtn.x = 150;
            this.settingsBtn.y = centerY + 40;

            // RIGHT SIDE (desktop)
            const PAD_RIGHT = 150;

            this.autoplayBtn.x = w - PAD_RIGHT;
            this.autoplayBtn.y = centerY + 35;

            this.minusBtn.x = this.autoplayBtn.x;
            this.minusBtn.y = centerY - 30;

            const GAP = 20;

            this.spinBtn.x =
                this.minusBtn.x - (this.minusBtn.width / 2) - GAP - (this.spinBtn.width / 2);
            this.spinBtn.y = centerY;

            this.plusBtn.x =
                this.spinBtn.x - (this.spinBtn.width / 2) - GAP - (this.plusBtn.width / 2);
            this.plusBtn.y = centerY - 35;

            return; // STOP HERE, do not continue
        }

        // ============================================================
        // MOBILE VERSION (portrait or narrow screens)
        // ============================================================

        // Bg height is taller for mobile
        this.bgBar.height = 180;

        // LEFT SIDE — VERTICAL STACK
        this.menuBtn.x = 40;
        this.menuBtn.y = this.bgBar.height/2 - 40;

        this.infoBtn.x = 40 + 40;
        this.infoBtn.y = this.bgBar.height/2;

        this.settingsBtn.x = 40;
        this.settingsBtn.y = this.bgBar.height/2 + 40;

        // CENTER — BIG SPIN
        this.spinBtn.x = w / 2;
        this.spinBtn.y = this.bgBar.height / 2 + 20;
        this.spinBtn.scale.set(.8); // slightly bigger for mobile

        // RIGHT SIDE — VERTICAL STACK
        const rightX = w - 40;

        this.plusBtn.x = rightX;
        this.plusBtn.y = this.bgBar.height/2 - 40;

        this.autoplayBtn.x = rightX - 40;
        this.autoplayBtn.y = this.bgBar.height/2;

        this.minusBtn.x = rightX;
        this.minusBtn.y = this.bgBar.height/2 + 40;


    }

}

import { Container, Sprite, Assets } from "pixi.js";

export class PirateStartScreen extends Container {
    private bg!: Sprite;
    private logo!: Sprite;
    private buyFreeSpin!: Sprite;
    private barrelBoard!: Sprite;
    private Gol_D_Roger!: Sprite;


    constructor() {
        super();
    }

    prepare() {
        this.init();
    }

    private async init() {
        // --- BACKGROUND ---
        const bgTexture = await Assets.load("/raw-assets/pirate/Background.png");
        this.bg = new Sprite(bgTexture);
        this.bg.anchor.set(0);
        this.addChildAt(this.bg, 0);

        // --- BARREL BOARD (CENTER) ---
        const barrelBoardTexture = await Assets.load("/raw-assets/pirate/Barrel-Board.png");
        this.barrelBoard = new Sprite(barrelBoardTexture);
        this.barrelBoard.anchor.set(0.5);
        this.barrelBoard.x = this.bg.width * 0.50;
        this.barrelBoard.y = this.bg.height * 0.38;
        this.barrelBoard.scale.set(0.6);
        this.addChild(this.barrelBoard);

        // --- LOGO (TOP-LEFT) ---
        const logoTexture = await Assets.load("/raw-assets/pirate/Logo.png");
        this.logo = new Sprite(logoTexture);
        this.logo.anchor.set(0.5);
        this.logo.x = this.bg.width * 0.1;
        this.logo.y = this.bg.height * 0.1;
        this.logo.scale.set(0.8);
        this.addChild(this.logo);

        const buyFreeSpinTexture = await Assets.load("/raw-assets/pirate/common/BuyFreeSpin.png");
        this.buyFreeSpin = new Sprite(buyFreeSpinTexture);
        this.buyFreeSpin.anchor.set(0.5);
        this.buyFreeSpin.x = this.bg.width * 0.1;
        this.buyFreeSpin.y = this.bg.height * 0.3;
        this.buyFreeSpin.scale.set(0.7);
        this.addChild(this.buyFreeSpin);

        // --- PIRATE KING (OPTIONAL) ---
        const rogerTexture = await Assets.load("/raw-assets/pirate/PirateKing1.png");
        this.Gol_D_Roger = new Sprite(rogerTexture);
        this.Gol_D_Roger.anchor.set(0.5);
        this.Gol_D_Roger.x = this.bg.width * 0.82;
        this.Gol_D_Roger.y = this.bg.height * 0.7;
        this.Gol_D_Roger.scale.set(0.7);
        this.addChild(this.Gol_D_Roger);

        // Trigger auto-layout
        window.dispatchEvent(new Event("resize"));
    }

public resize(width: number, height: number) {
    if (!this.bg || !this.logo || !this.barrelBoard || !this.buyFreeSpin) return;

    const margin = 20;

    // ------------------------------------------------------
    // ⭐ COVER BACKGROUND (FULL SCREEN)
    // ------------------------------------------------------
    const bgRatio = this.bg.texture.width / this.bg.texture.height;
    const screenRatio = width / height;

    if (screenRatio > bgRatio) {
        this.bg.width = width;
        this.bg.height = width / bgRatio;
    } else {
        this.bg.height = height;
        this.bg.width = height * bgRatio;
    }

    // Center background
    this.bg.x = (width - this.bg.width) / 2;
    this.bg.y = (height - this.bg.height) / 2;

    // ======================================================
    // ⭐ LOGO RESPONSIVE POSITION (top-left)
    // ======================================================
    let logoX = this.bg.x + this.bg.width * 0.10;
    let logoY = this.bg.y + this.bg.height * 0.10;

    // clamp
    logoX = Math.min(logoX, width - this.logo.width * 0.5 - margin);
    logoX = Math.max(logoX, this.logo.width * 0.5 + margin);

    logoY = Math.min(logoY, height - this.logo.height * 0.5 - margin);
    logoY = Math.max(logoY, this.logo.height * 0.5 + margin);

    this.logo.x = logoX;
    this.logo.y = logoY;

    // responsive scale
    if (width <= 425) this.logo.scale.set(0.55);
    else if (width <= 768) this.logo.scale.set(0.65);
    else this.logo.scale.set(0.75);

    // ======================================================
    // ⭐ BUY FREE SPIN (SAME RESPONSIVE RULES AS LOGO)
    // original: x = 0.10 , y = 0.30
    // ======================================================
    let bfsX = this.bg.x + this.bg.width * 0.10;
    let bfsY = this.bg.y + this.bg.height * 0.50;

    // clamp so it's never off-screen
    bfsX = Math.min(bfsX, width - this.buyFreeSpin.width * 0.5 - margin);
    bfsX = Math.max(bfsX, this.buyFreeSpin.width * 0.5 + margin);

    bfsY = Math.min(bfsY, height - this.buyFreeSpin.height * 0.5 - margin);
    bfsY = Math.max(bfsY, this.buyFreeSpin.height * 0.5 + margin);

    this.buyFreeSpin.x = bfsX;
    this.buyFreeSpin.y = bfsY;

    // responsive scale (same as logo for consistency)
    if (width <= 425) this.buyFreeSpin.scale.set(0.55);
    else if (width <= 768) this.buyFreeSpin.scale.set(0.65);
    else this.buyFreeSpin.scale.set(0.75);

    // ======================================================
    // ⭐ BARREL BOARD (center-ish)
    // ======================================================
    let barrelX = this.bg.x + this.bg.width * 0.50;
    let barrelY = this.bg.y + this.bg.height * 0.40;

    if (width <= 425) this.barrelBoard.scale.set(0.50);
    else if (width <= 768) this.barrelBoard.scale.set(0.60);
    else this.barrelBoard.scale.set(0.70);

    barrelX = Math.max(barrelX, this.barrelBoard.width * 0.5 + margin);
    barrelX = Math.min(barrelX, width - this.barrelBoard.width * 0.5 - margin);

    barrelY = Math.max(barrelY, this.barrelBoard.height * 0.5);
    barrelY = Math.min(barrelY, height - this.barrelBoard.height * 0.5);

    this.barrelBoard.x = barrelX;
    this.barrelBoard.y = barrelY;

    // ======================================================
    // ⭐ GOL D. ROGER (right-bottom)
    // ======================================================
    if (this.Gol_D_Roger) {
        this.Gol_D_Roger.x = this.bg.x + this.bg.width * 0.89;
        this.Gol_D_Roger.y = this.bg.y + this.bg.height * 0.60;

        if (width <= 425) this.Gol_D_Roger.scale.set(0.55);
        else if (width <= 768) this.Gol_D_Roger.scale.set(0.65);
        else this.Gol_D_Roger.scale.set(0.70);
    }
}


}

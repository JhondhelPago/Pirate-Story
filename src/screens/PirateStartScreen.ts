import { Container, Sprite, Assets } from "pixi.js";
import { BarrelBoard } from "../ui/pirate/BarrelBoard";
import { ControllerPanel } from "../ui/pirate/PlayerController";

export class PirateStartScreen extends Container {
    private bg!: Sprite;
    private logo!: Sprite;
    private buyFreeSpin!: Sprite;
    private barrelBoard!: BarrelBoard;
    private Gol_D_Roger!: Sprite;
    private playerController!: ControllerPanel;

    private deviceType: "mobile" | "tablet" | "desktop" = "desktop";
    private orientation: "portrait" | "landscape" = "landscape";

    constructor() {
        super();
    }

    prepare() {
        this.init();
    }

    // --------------------------------------------------------------
    // 🔥 DEVICE + ORIENTATION DETECTION
    // --------------------------------------------------------------
    private detectDevice(width: number) {
        if (width <= 425) this.deviceType = "mobile";
        else if (width <= 1024) this.deviceType = "tablet";
        else this.deviceType = "desktop";
    }

    private detectOrientation(width: number, height: number) {
        this.orientation = height >= width ? "portrait" : "landscape";
    }

    private async init() {
        // --- BACKGROUND ---
        const bgTexture = await Assets.load("/raw-assets/pirate/Background.png");
        this.bg = new Sprite(bgTexture);
        this.bg.anchor.set(0);
        this.addChildAt(this.bg, 0);

        // --- BARREL BOARD ---
        this.barrelBoard = new BarrelBoard();
        this.addChild(this.barrelBoard);

        // --- LOGO ---
        const logoTexture = await Assets.load("/raw-assets/pirate/Logo.png");
        this.logo = new Sprite(logoTexture);
        this.logo.anchor.set(0.5);
        this.addChild(this.logo);

        // --- BUY FREE SPIN ---
        const buyFreeSpinTexture = await Assets.load("/raw-assets/pirate/common/BuyFreeSpin.png");
        this.buyFreeSpin = new Sprite(buyFreeSpinTexture);
        this.buyFreeSpin.anchor.set(0.5);
        this.addChild(this.buyFreeSpin);

        // --- PIRATE KING ---
        const rogerTexture = await Assets.load("/raw-assets/pirate/PirateKing1.png");
        this.Gol_D_Roger = new Sprite(rogerTexture);
        this.Gol_D_Roger.anchor.set(0.5);
        this.addChild(this.Gol_D_Roger);

        // --- CONTROLLER PANEL ---
        this.playerController = new ControllerPanel();
        this.addChild(this.playerController);


        // Trigger auto-layout
        window.dispatchEvent(new Event("resize"));
    }

    // ====================================================================
    // RESPONSIVE RESIZE HANDLER
    // ====================================================================
    public resize(width: number, height: number) {
        if (!this.bg) return;

        // Detect device + orientation
        this.detectDevice(width);
        this.detectOrientation(width, height);

        // Resize background (cover)
        const bgRatio = this.bg.texture.width / this.bg.texture.height;
        const screenRatio = width / height;

        if (screenRatio > bgRatio) {
            this.bg.width = width;
            this.bg.height = width / bgRatio;
        } else {
            this.bg.height = height;
            this.bg.width = height * bgRatio;
        }

        this.bg.x = (width - this.bg.width) / 2;
        this.bg.y = (height - this.bg.height) / 2;

        // ----------------------------------------
        // 🔥 DEVICE LAYOUT ROUTING
        // ----------------------------------------
        if (this.deviceType === "desktop") {
            if (this.orientation === "portrait") this.layoutDesktopPortrait(width, height);
            else this.layoutDesktopLandscape(width, height);
        }

        if (this.deviceType === "tablet") {
            if (this.orientation === "portrait") this.layoutTabletPortrait(width, height);
            else this.layoutTabletLandscape(width, height);
        }

        if (this.deviceType === "mobile") {
            if (this.orientation === "portrait") this.layoutMobilePortrait(width, height);
            else this.layoutMobileLandscape(width, height);
        }

        // Resize the controller panel
        if (this.playerController) {
            this.playerController.resize(width, height);
        }

    }

    // ====================================================================
    // 🔥 LAYOUTS (EDIT THESE TO MATCH YOUR DESIGNS)
    // ====================================================================

    // ----------------------------------------------------
    // DESKTOP LANDSCAPE  ⭐ = your original design
    // ----------------------------------------------------
    private layoutDesktopLandscape(width: number, height: number) {
        this.barrelBoard.scale.set(0.7);
        this.barrelBoard.x = this.bg.x + this.bg.width * 0.50;
        this.barrelBoard.y = this.bg.y + this.bg.height * 0.44;

        this.logo.scale.set(0.7);
        this.logo.x = this.bg.x + this.bg.width * 0.1;
        this.logo.y = this.bg.y + this.bg.height * 0.2;

        this.buyFreeSpin.scale.set(0.6);
        this.buyFreeSpin.x = this.bg.x + this.bg.width * 0.1;
        this.buyFreeSpin.y = this.bg.y + this.bg.height * 0.45;

        this.Gol_D_Roger.scale.set(0.7);
        this.Gol_D_Roger.x = this.bg.x + this.bg.width * 0.9;
        this.Gol_D_Roger.y = this.bg.y + this.bg.height * 0.65;
    }

    private layoutDesktopPortrait(width: number, height: number) {
        // Optional: unlikely needed
    }

    // ----------------------------------------------------
    // TABLET LANDSCAPE
    // ----------------------------------------------------
    private layoutTabletLandscape(width: number, height: number) {
        this.barrelBoard.scale.set(0.55);
        this.barrelBoard.x = width * 0.55;
        this.barrelBoard.y = height * 0.45;

        this.logo.scale.set(0.7);
        this.logo.x = width * 0.1;
        this.logo.y = height * 0.12;

        this.buyFreeSpin.scale.set(0.65);
        this.buyFreeSpin.x = width * 0.12;
        this.buyFreeSpin.y = height * 0.32;

        this.Gol_D_Roger.scale.set(0.65);
        this.Gol_D_Roger.x = width ;
        this.Gol_D_Roger.y = height ;
    }

    // ----------------------------------------------------
    // TABLET PORTRAIT
    // ----------------------------------------------------
    private layoutTabletPortrait(width: number, height: number) {
        this.barrelBoard.scale.set(0.50);
        this.barrelBoard.x = width / 2;
        this.barrelBoard.y = height * 0.4;

        this.logo.scale.set(0.60);
        this.logo.x = width / 2;
        this.logo.y = height * 0.10;

        this.buyFreeSpin.scale.set(0.6);
        this.buyFreeSpin.x = width * 0.2;
        this.buyFreeSpin.y = height * 0.73;

        this.Gol_D_Roger.scale.set(0.5);
        this.Gol_D_Roger.anchor.set(1, 1); // bottom-right anchor
        this.Gol_D_Roger.x = width;   
        this.Gol_D_Roger.y = height;  

    }

    // ----------------------------------------------------
    // MOBILE PORTRAIT (main mobile layout)
    // ----------------------------------------------------
    private layoutMobilePortrait(width: number, height: number) {
        this.barrelBoard.scale.set(0.45);
        this.barrelBoard.x = width / 2;
        this.barrelBoard.y = height * 0.4;

        this.logo.scale.set(0.55);
        this.logo.x = width / 2;
        this.logo.y = height * 0.09;

        this.buyFreeSpin.scale.set(0.5);
        this.buyFreeSpin.x = width * .25;
        this.buyFreeSpin.y = height * 0.73;

        this.Gol_D_Roger.scale.set(0.38);
        this.Gol_D_Roger.x = width - 80;
        this.Gol_D_Roger.y = height - 100;
    }

    // ----------------------------------------------------
    // MOBILE LANDSCAPE
    // ----------------------------------------------------
    private layoutMobileLandscape(width: number, height: number) {
        this.barrelBoard.scale.set(0.45);
        this.barrelBoard.x = width * 0.55;
        this.barrelBoard.y = height * 0.55;

        this.logo.scale.set(0.45);
        this.logo.x = width * 0.85;
        this.logo.y = height * 0.50;

        this.buyFreeSpin.scale.set(0.45);
        this.buyFreeSpin.x = width * 0.15;
        this.buyFreeSpin.y = height * 0.40;

        this.Gol_D_Roger.scale.set(1);
        this.Gol_D_Roger.x = width * 0.10;
        this.Gol_D_Roger.y = height * 0.75;
    }
}

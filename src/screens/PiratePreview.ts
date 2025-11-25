import { Container, Sprite, Assets } from 'pixi.js';
import { PlayWheelButton } from '../ui/pirate/PlayWheelButton';
import { BarrelBoard } from '../ui/pirate/BarrelBoard';

export class PiratePreviewScreen extends Container {
    private bg!: Sprite;
    private logo!: Sprite;
    private barrelBoard!: BarrelBoard;
    private playWheelButton!: PlayWheelButton;
    private Gol_D_Roger!: Sprite;
    private descriptionPreview!: Sprite;
    private pagination!: Sprite;

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
        if (width <= 600) this.deviceType = "mobile";
        else if (width <= 1024) this.deviceType = "tablet";
        else this.deviceType = "desktop";
    }

    private detectOrientation(width: number, height: number) {
        this.orientation = height >= width ? "portrait" : "landscape";
    }

    private async init() {
        // BACKGROUND
        const bgTexture = await Assets.load("/raw-assets/pirate/Background.png");
        this.bg = new Sprite(bgTexture);
        this.bg.anchor.set(0);
        this.addChildAt(this.bg, 0);

        // LOGO
        const logoTexture = await Assets.load("/raw-assets/pirate/Logo.png");
        this.logo = new Sprite(logoTexture);
        this.logo.anchor.set(0.5);
        this.addChild(this.logo);

        // BARREL BOARD
        this.barrelBoard = new BarrelBoard();
        this.addChild(this.barrelBoard);

        // PLAY WHEEL BTN
        this.playWheelButton = new PlayWheelButton();
        
        this.addChild(this.playWheelButton);

        // Gol D Roger
        const rogerTexture = await Assets.load("/raw-assets/pirate/PirateKing.png");
        this.Gol_D_Roger = new Sprite(rogerTexture);
        this.Gol_D_Roger.anchor.set(0.5);
        this.addChild(this.Gol_D_Roger);

        // Description Preview
        const descTexture = await Assets.load("/raw-assets/pirate/common/descrip-prev.png");
        this.descriptionPreview = new Sprite(descTexture);
        this.descriptionPreview.anchor.set(0.5);
        this.addChild(this.descriptionPreview);

        // Pagination
        const paginationTexture = await Assets.load("/raw-assets/pirate/common/Pagination.png");
        this.pagination = new Sprite(paginationTexture);
        this.pagination.anchor.set(0.5);
        this.addChild(this.pagination);

        // Trigger resize on first load
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
    }

    // ====================================================================
    // 🔥 LAYOUTS (EDIT THESE TO MATCH YOUR DESIGNS)
    // ====================================================================

    // -------------------------------
    // DESKTOP LANDSCAPE (Main Layout)
    // -------------------------------
    private layoutDesktopLandscape(width: number, height: number) {
        this.barrelBoard.setScaleByScreen(width);
        this.barrelBoard.x = this.bg.x + this.bg.width * 0.40;
        this.barrelBoard.y = this.bg.y + this.bg.height * 0.40;

        this.logo.scale.set(0.78);
        this.logo.x = this.bg.x + this.bg.width * 0.85;
        this.logo.y = this.bg.y + this.bg.height * 0.25;

        this.Gol_D_Roger.scale.set(0.7);
        this.Gol_D_Roger.x = this.bg.x + this.bg.width * 0.1;
        this.Gol_D_Roger.y = this.bg.y + this.bg.height * 0.71;

        this.descriptionPreview.scale.set(0.8);
        this.descriptionPreview.x = this.bg.x + this.bg.width * 0.4;
        this.descriptionPreview.y = this.bg.y + this.bg.height * 0.75;

        this.pagination.scale.set(0.5);
        this.pagination.x = this.bg.x + this.bg.width * 0.4;
        this.pagination.y = this.bg.y + this.bg.height * 0.8;

        this.playWheelButton.scale.set(0.68);
        this.playWheelButton.x = this.bg.x + this.bg.width * 0.75;
        this.playWheelButton.y = this.bg.y + this.bg.height * 0.5;
    }

    private layoutDesktopPortrait(width: number, height: number) {
        // You set the design here
    }

    // -------------------------------
    // TABLET LANDSCAPE
    // -------------------------------
    private layoutTabletLandscape(width: number, height: number) {
        // custom position here
    }

    // -------------------------------
    // TABLET PORTRAIT
    // -------------------------------
    private layoutTabletPortrait(width: number, height: number) {
        // custom position here
    }

    // -------------------------------
    // MOBILE PORTRAIT
    // -------------------------------
    private layoutMobilePortrait(width: number, height: number) {
        this.barrelBoard.setScaleByScreen(width);

        this.barrelBoard.x = width / 2;
        this.barrelBoard.y = height * 0.4;

        this.logo.scale.set(0.6);
        this.logo.x = width / 2;
        this.logo.y = this.barrelBoard.y - this.barrelBoard.height * 0.89;

        this.Gol_D_Roger.scale.set(0.5);
        this.Gol_D_Roger.x = width * 0.2;
        this.Gol_D_Roger.y = height * 0.85;

        this.descriptionPreview.scale.set(0.7);
        this.pagination.scale.set(0.4);

        this.descriptionPreview.x = width / 2;
        this.descriptionPreview.y = height * 0.55;

        this.pagination.x = width / 2;
        this.pagination.y = this.descriptionPreview.y + 60;

        this.playWheelButton.scale.set(0.55);
        this.playWheelButton.x = width / 2 - 100;
        this.playWheelButton.y = height * 0.65;
    }

    // -------------------------------
    // MOBILE LANDSCAPE
    // -------------------------------
    private layoutMobileLandscape(width: number, height: number) {
        this.barrelBoard.setScaleByScreen(width);
        this.barrelBoard.x = width / 2;
        this.barrelBoard.y = height / 2;

        this.logo.scale.set(0.5);
        this.logo.x = width * 0.85;
        this.logo.y = height * 0.20;

        this.Gol_D_Roger.scale.set(0.5);
        this.Gol_D_Roger.x = width * 0.10;
        this.Gol_D_Roger.y = height * 0.60;

        this.descriptionPreview.x = width * 0.70;
        this.descriptionPreview.y = height * 0.55;

        this.pagination.x = this.descriptionPreview.x;
        this.pagination.y = this.descriptionPreview.y + 50;

        this.playWheelButton.scale.set(0.55);
        this.playWheelButton.x = width * 0.80;
        this.playWheelButton.y = height * 0.80;
    }
}

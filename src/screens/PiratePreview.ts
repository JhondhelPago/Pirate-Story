import { Container, Sprite, Assets, Ticker } from 'pixi.js';
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

    constructor() {
        super();
    }

    prepare() {
        this.init();
    }

    private async init() {
        // ------------------------
        // BACKGROUND
        // ------------------------
        const bgTexture = await Assets.load("/raw-assets/pirate/Background.png");
        this.bg = new Sprite(bgTexture);
        this.bg.anchor.set(0);
        this.addChildAt(this.bg, 0);

        // ------------------------
        // LOGO
        // ------------------------
        const logoTexture = await Assets.load("/raw-assets/pirate/Logo.png");
        this.logo = new Sprite(logoTexture);
        this.logo.anchor.set(0.5);
        this.logo.x = this.bg.width * 0.85;
        this.logo.y = this.bg.height * 0.20;
        this.logo.scale.set(0.8);
        this.addChild(this.logo);

        // ------------------------
        // ⭐ BARREL BOARD (imported container)
        // ------------------------
        this.barrelBoard = new BarrelBoard();
        this.barrelBoard.x = this.bg.width * 0.5;
        this.barrelBoard.y = this.bg.height * 0.30;
        this.barrelBoard.scale.set(0.58);
        this.addChild(this.barrelBoard);


        // ------------------------
        // PLAY WHEEL BUTTON
        // ------------------------
        this.playWheelButton = new PlayWheelButton();
        this.playWheelButton.scale.set(0.68);
        this.addChild(this.playWheelButton);

        // ------------------------
        // GOL D. ROGER
        // ------------------------
        const Gol_D_RogerTexture = await Assets.load("/raw-assets/pirate/PirateKing.png");
        this.Gol_D_Roger = new Sprite(Gol_D_RogerTexture);
        this.Gol_D_Roger.anchor.set(0.5);
        this.Gol_D_Roger.x = this.bg.width * 0.08;
        this.Gol_D_Roger.y = this.bg.height * 0.50;
        this.Gol_D_Roger.scale.set(0.7);
        this.addChild(this.Gol_D_Roger);

        // ------------------------
        // DESCRIPTION PREVIEW
        // ------------------------
        const descriptionPreviewTexture = await Assets.load("/raw-assets/pirate/common/descrip-prev.png");
        this.descriptionPreview = new Sprite(descriptionPreviewTexture);
        this.descriptionPreview.anchor.set(0.5);
        this.descriptionPreview.x = this.bg.width * 0.33;
        this.descriptionPreview.y = this.bg.height * 0.52;
        this.descriptionPreview.scale.set(0.8);
        this.addChild(this.descriptionPreview);

        // ------------------------
        // PAGINATION
        // ------------------------
        const paginationTexture = await Assets.load("/raw-assets/pirate/common/Pagination.png");
        this.pagination = new Sprite(paginationTexture);
        this.pagination.anchor.set(0.5);
        this.pagination.x = this.bg.width * 0.33;
        this.pagination.y = this.bg.height * 0.56;
        this.pagination.scale.set(0.5);
        this.addChild(this.pagination);

        // Force initial resize
        window.dispatchEvent(new Event("resize"));
    }




    // ============================================================
    //             RESIZE HANDLER
    // ============================================================
    public resize(width: number, height: number) {
        if (!this.bg || !this.logo || !this.barrelBoard) return;

        // ------------------------
        // BACKGROUND COVER
        // ------------------------
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

        // ------------------------
        // LOGO
        // ------------------------
        const margin = 20;

        let logoX = this.bg.x + this.bg.width * 0.85;
        let logoY = this.bg.y + this.bg.height * 0.20;

        logoX = Math.min(logoX, width - this.logo.width * 0.5 - margin);
        logoX = Math.max(logoX, this.logo.width * 0.5 + margin);

        logoY = Math.min(logoY, height - this.logo.height * 0.5 - margin);
        logoY = Math.max(logoY, this.logo.height * 0.5 + margin);

        this.logo.x = logoX;
        this.logo.y = logoY;

        if (width <= 425) this.logo.scale.set(0.6);
        else this.logo.scale.set(0.8);

        // ------------------------
        // ⭐ BARREL BOARD POSITION
        // ------------------------
        let barrelX = this.bg.x + this.bg.width * 0.40;
        let barrelY = this.bg.y + this.bg.height * 0.30;

        // USE BARRELBOARD CLASS SCALE
        this.barrelBoard.setScaleByScreen(width);

        barrelX = Math.max(barrelX, this.barrelBoard.width * 0.5 + margin);
        barrelX = Math.min(barrelX, width - this.barrelBoard.width * 0.5 - margin);

        barrelY = Math.max(barrelY, this.barrelBoard.height * 0.5 + margin);
        barrelY = Math.min(barrelY, height - this.barrelBoard.height * 0.5 - margin);

        this.barrelBoard.x = barrelX;
        this.barrelBoard.y = barrelY;

        // ------------------------
        // PLAY WHEEL BUTTON
        // ------------------------
        this.playWheelButton.x = this.bg.x + this.bg.width * 0.82;
        this.playWheelButton.y = this.bg.y + this.bg.height * 0.55;

        this.playWheelButton.pivot.set(
            this.playWheelButton.width * 0.5,
            this.playWheelButton.height * 0.5
        );
    }


}

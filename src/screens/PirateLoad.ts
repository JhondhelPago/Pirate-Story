import { Container, Sprite, Assets } from "pixi.js";

export class PirateLoadScreen extends Container {
    private bg!: Sprite;
    private logo!: Sprite;
    private playText!: Sprite;
    private confirmButton!: Sprite;
    private cancelButton!: Sprite;

    constructor() {
        super();
    }
    
    prepare() {
        this.init();
    }

    private async init() {
        // Load background texture
        const bgTexture = await Assets.load("/raw-assets/pirate/Background.png");
        this.bg = new Sprite(bgTexture);
        this.bg.anchor.set(0); // top-left
        this.addChildAt(this.bg, 0); // ensure it's the bottom layer

        const logoTexture = await Assets.load("/raw-assets/pirate/Logo.png");
        this.logo = new Sprite(logoTexture);
        this.logo.anchor.set(0.5);
        this.logo.x = this.bg.width * 0.5;
        this.logo.y = (this.bg.height * 0.5) - 80;
        this.logo.scale.set(1.4);
        this.addChild(this.logo);

        const playTextTexture = await Assets.load("/raw-assets/pirate/common/play-text.png");
        this.playText = new Sprite(playTextTexture);
        this.playText.anchor.set(0.5);
        this.playText.x = this.bg.width * 0.5;
        this.playText.y = (this.bg.height * 0.8) - 150;
        this.addChild(this.playText);

        const confirmButtonTexture = await Assets.load("/raw-assets/pirate/common/confirm-button.png");
        this.confirmButton = new Sprite(confirmButtonTexture);
        this.confirmButton.anchor.set(0.5);
        this.confirmButton.x = (this.bg.width * 0.5)  - 100;
        this.confirmButton.y = (this.bg.height * 0.8) - 50;
        this.confirmButton.interactive = true;
        this.confirmButton.cursor = 'pointer';  
        this.confirmButton.on('pointerover', () => {
            this.confirmButton.scale.set(1.2); // scale up 10%
        });
        this.confirmButton.on('pointerout', () => {
            this.confirmButton.scale.set(1); // reset scale
        });
        this.addChild(this.confirmButton);


        const cancelButtonTexture = await Assets.load("/raw-assets/pirate/common/cancel-button.png");
        this.cancelButton = new Sprite(cancelButtonTexture);
        this.cancelButton.anchor.set(0.5);
        this.cancelButton.x = (this.bg.width * 0.5) + 100;
        this.cancelButton.y = (this.bg.height * 0.8) - 50;
        this.cancelButton.interactive = true;
        this.cancelButton.cursor = 'pointer'; 
        this.cancelButton.on('pointerover', () => {
            this.cancelButton.scale.set(1.2); // scale up 10%
        });
        this.cancelButton.on('pointerout', () => {
            this.cancelButton.scale.set(1); // reset scale
        });
        this.addChild(this.cancelButton);

        window.dispatchEvent(new Event("resize"));


    }

    /** Resize the screen — called whenever window size changes */
    public resize(width: number, height: number) {
        if (!this.bg) return;

        // Resize bg like CSS cover
        const bgTextureRatio = this.bg.texture.width / this.bg.texture.height;
        const screenRatio = width / height;

        if (screenRatio > bgTextureRatio) {
            this.bg.width = width;
            this.bg.height = width / bgTextureRatio;
        } else {
            this.bg.height = height;
            this.bg.width = height * bgTextureRatio;
        }

        // Center background
        this.bg.x = (width - this.bg.width) / 2;
        this.bg.y = (height - this.bg.height) / 2;

        // ⭐ Detect Mobile L
        const isMobileL = width <= 768;

        // ⭐ Responsive Scaling
        if (isMobileL) {
            this.logo.scale.set(1.0);
            this.playText.scale.set(0.8);
            this.confirmButton.scale.set(0.9);
            this.cancelButton.scale.set(0.9);
        } else {
            this.logo.scale.set(1.4);
            this.playText.scale.set(1.0);
            this.confirmButton.scale.set(1.0);
            this.cancelButton.scale.set(1.0);
        }

        // ⭐ Recalculate logo position
        if (this.logo) {
            this.logo.x = this.bg.x + this.bg.width * 0.5;
            this.logo.y = this.bg.y + this.bg.height * 0.5 - 80;
        }

        // ⭐ Recalculate playText position
        if (this.playText) {
            this.playText.x = this.bg.x + this.bg.width * 0.5;
            this.playText.y = this.bg.y + this.bg.height * 0.8 - 150;
        }

        // ⭐ Recalculate confirm button position
        if (this.confirmButton) {
            this.confirmButton.x = this.bg.x + (this.bg.width * 0.5) - 100;
            this.confirmButton.y = this.bg.y + (this.bg.height * 0.8) - 50;
        }

        // ⭐ Recalculate cancel button position
        if (this.cancelButton) {
            this.cancelButton.x = this.bg.x + (this.bg.width * 0.5) + 100;
            this.cancelButton.y = this.bg.y + (this.bg.height * 0.8) - 50;
        }
    }




}

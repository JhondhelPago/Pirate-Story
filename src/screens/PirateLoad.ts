import { Container, Sprite } from "pixi.js";

export class PirateLoadScreen extends Container {
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
        // ⭐ All assets come from the atlas, so use Sprite.from()

        this.logo = Sprite.from("Logo.png");
        this.logo.anchor.set(0.5);
        this.addChild(this.logo);

        this.playText = Sprite.from("play-text.png");
        this.playText.anchor.set(0.5);
        this.addChild(this.playText);

        this.confirmButton = Sprite.from("confirm-button.png");
        this.confirmButton.anchor.set(0.5);
        this.confirmButton.interactive = true;
        this.confirmButton.cursor = "pointer";
        this.confirmButton.on("pointerover", () => this.confirmButton.scale.set(1.2));
        this.confirmButton.on("pointerout", () => this.confirmButton.scale.set(1.0));
        this.addChild(this.confirmButton);

        this.cancelButton = Sprite.from("cancel-button.png");
        this.cancelButton.anchor.set(0.5);
        this.cancelButton.interactive = true;
        this.cancelButton.cursor = "pointer";
        this.cancelButton.on("pointerover", () => this.cancelButton.scale.set(1.2));
        this.cancelButton.on("pointerout", () => this.cancelButton.scale.set(1.0));
        this.addChild(this.cancelButton);
    }

    public resize(width: number, height: number) {
        const isMobileL = width <= 768;

        this.logo.scale.set(isMobileL ? 1.0 : 1.4);
        this.playText.scale.set(isMobileL ? 0.8 : 1.0);
        this.confirmButton.scale.set(isMobileL ? 0.9 : 1.0);
        this.cancelButton.scale.set(isMobileL ? 0.9 : 1.0);

        this.logo.x = width * 0.5;
        this.logo.y = height * 0.5 - 80;

        this.playText.x = width * 0.5;
        this.playText.y = height * 0.8 - 150;

        this.confirmButton.x = width * 0.5 - 100;
        this.confirmButton.y = height * 0.8 - 50;

        this.cancelButton.x = width * 0.5 + 100;
        this.cancelButton.y = height * 0.8 - 50;
    }
}

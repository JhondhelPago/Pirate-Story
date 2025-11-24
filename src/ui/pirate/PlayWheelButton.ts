import { Container, Sprite, Assets, Rectangle, Ticker } from "pixi.js";
import { navigation } from "../../utils/navigation";
import { PirateLoadScreen } from "../../screens/PirateLoad";
import { app } from "../../main";

export class PlayWheelButton extends Container {
    private wheel!: Sprite;
    private playButton!: Sprite;
    private spinning = false;

    constructor() {
        super();
        this.init();
    }

    private async init() {
        this.wheel = new Sprite(await Assets.load("/raw-assets/pirate/wheel.png"));
        this.playButton = new Sprite(await Assets.load("/raw-assets/pirate/common/play-icon.png"));
        this.playButton.scale.set(0.8);

        // Wheel rotates around its center
        this.wheel.anchor.set(0.5);

        this.addChild(this.wheel);
        this.addChild(this.playButton);

        this.layout();

        // ============= CLICK ON ENTIRE CONTAINER =============
        this.eventMode = "static";        // enable interaction for container
        this.cursor = "pointer";          // show hand cursor
        this.on("pointerdown", () => {
        this.startWheelSpin();

        // ⏳ delay navigation by 2 seconds
        setTimeout(() => {
            navigation.showScreen(PirateLoadScreen);
        }, 1500);
});

        
    }

    private layout() {
        const size = this.wheel.texture.width;

        // center wheel
        this.wheel.x = size / 2;
        this.wheel.y = size / 2;

        // center play button
        this.playButton.anchor.set(0.5);
        this.playButton.x = size / 2 + 10;
        this.playButton.y = size / 2;

        // BIG FIX: hit area equals full wheel
        this.hitArea = new Rectangle(0, 0, size, size);
    }


    private startWheelSpin() {
        if (this.spinning) return;
        this.spinning = true;

        let speed = 0.25;
        const friction = 0.0012;

        const spin = (ticker: Ticker) => {
            this.wheel.rotation += speed * ticker.deltaTime;
            speed -= friction * ticker.deltaTime;

            if (speed <= 0) {
                app.ticker.remove(spin);
                this.spinning = false;
            }
        };

        app.ticker.add(spin);
    }
}


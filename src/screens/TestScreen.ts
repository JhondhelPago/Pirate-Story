import { Container, Graphics, Text } from "pixi.js";

export class TestScreen extends Container {
    public box!: Graphics;
    public circle!: Graphics;

    constructor() {
        super();
    }

    prepare() {
        this.init();
    }

    private init() {
        // 🟪 Purple Box
        this.box = new Graphics()
            .rect(0, 0, 300, 200)
            .fill(0x9933ff);

        this.addChild(this.box);

        // 🟡 Yellow Circle
        this.circle = new Graphics()
            .circle(0, 0, 80)
            .fill(0xffdd33);

        this.addChild(this.circle);

    }

    public resize(width: number, height: number) {
        // Center the graphics

        this.box.x = width * 0.25 - 150;  // left side
        this.box.y = height * 0.5 - 100;

        this.circle.x = width * 0.75;     // right side
        this.circle.y = height * 0.5;
    }
}

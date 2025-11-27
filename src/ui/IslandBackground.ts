import { Container, Sprite } from "pixi.js";

/**
 * A fully responsive background that always covers the viewport,
 * behaves like CSS: background-size: cover.
 */
export class IslandBackground extends Container {
    private bg!: Sprite;

    // Match the image size in your atlas JSON
    private readonly originalWidth = 1920;
    private readonly originalHeight = 1080;

    constructor() {
        super();

        // Load background from atlas (key: "Background")
        this.bg = Sprite.from("Background");
        this.bg.anchor.set(0.5);
        this.addChild(this.bg);
    }

    /**
     * Resize to fill every screen size & aspect ratio.
     * Ensures no distortion and no empty borders.
     */
    public resize(width: number, height: number) {
        this.bg.x = width / 2;
        this.bg.y = height / 2;

        const scaleX = width / this.originalWidth;
        const scaleY = height / this.originalHeight;
        const finalScale = Math.max(scaleX, scaleY);

        this.bg.scale.set(finalScale);
    }

    // Navigation compatibility (must return Promise<void>)
    public async show(): Promise<void> {
        return;
    }

    public async hide(): Promise<void> {
        return;
    }

    public async pause(): Promise<void> {
        return;
    }

    public async resume(): Promise<void> {
        return;
    }

    public blur(): void {}
    public focus(): void {}
    public prepare(): void {}
    public reset(): void {}
}

import { Container, Sprite, Assets, Graphics } from "pixi.js";

export class BarrelBoard extends Container {
    private bg!: Sprite;
    public gridContainer!: Container;

    private rows = 5;
    private cols = 5;

    // 🔥 Bigger grid immediately
    private cellSize = 140;
    private spacing = 14;

    constructor() {
        super();
        this.pivot.set(0.5);
        this.initialize();
    }

    private async initialize() {
        // Load board background
        const boardTexture = await Assets.load("/raw-assets/pirate/Barrel-Board.png");
        this.bg = new Sprite(boardTexture);
        this.bg.anchor.set(0.5);
        this.addChild(this.bg);

        // GRID CONTAINER
        this.gridContainer = new Container();
        this.addChild(this.gridContainer);

        this.createGrid();

        // Center grid inside the board
        this.gridContainer.pivot.set(
            this.gridContainer.width * 0.5,
            this.gridContainer.height * 0.5
        );
    }

    private createGrid() {
        this.gridContainer.removeChildren(); // clear old grid

        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                const box = new Graphics();
                box.beginFill(0xffffff, 0.25);
                box.drawRect(0, 0, this.cellSize, this.cellSize);
                box.endFill();

                box.x = c * (this.cellSize + this.spacing);
                box.y = r * (this.cellSize + this.spacing);

                this.gridContainer.addChild(box);
            }
        }
    }

    public setGridScale(scale: number) {
        this.gridContainer.scale.set(scale);
        this.gridContainer.pivot.set(
            this.gridContainer.width * 0.5,
            this.gridContainer.height * 0.5
        );
    }

    public setScaleByScreen(width: number) {
        if (width <= 425) this.scale.set(0.45);
        else if (width <= 768) this.scale.set(0.55);
        else this.scale.set(0.58);
    }
}

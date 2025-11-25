import { Container, Graphics } from "pixi.js";
import { SlotTile } from "./SlotTile";

export class SlotGridMask extends Container {
    private rows = 5;
    private cols = 5;

    private cellSize = 140;
    private spacing = 14;

    private maskContainer!: Container;
    private maskShape!: Graphics;
    private gridContainer!: Container;

    constructor() {
        super();
        this.init();
    }

    private async init() {
        this.maskContainer = new Container();
        this.addChild(this.maskContainer);

        this.maskShape = new Graphics();
        this.maskContainer.addChild(this.maskShape);

        // apply mask
        this.maskContainer.mask = this.maskShape;

        this.gridContainer = new Container();
        this.maskContainer.addChild(this.gridContainer);

        await this.createGrid();     
        this.drawMaskCorrectSize();  
    }

    private async createGrid() {
        this.gridContainer.removeChildren();

        const bgPath = "/raw-assets/pirate/slot-symbol/brown-rectangle.png";
        const iconPath = "/raw-assets/pirate/slot-symbol/jackpot-chest.png";

        const loadPromises: Promise<void>[] = [];

        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                const tile = new SlotTile(bgPath, iconPath);

                // detect when SlotTile finished loading textures
                const loadPromise = new Promise<void>((resolve) => {
                    tile.once("loaded", () => resolve());
                });
                loadPromises.push(loadPromise);

                tile.x = c * (this.cellSize + this.spacing) + this.cellSize / 2;
                tile.y = r * (this.cellSize + this.spacing) + this.cellSize / 2;

                this.gridContainer.addChild(tile);
            }
        }

        // Wait until all tiles are fully loaded
        await Promise.all(loadPromises);

        this.gridContainer.pivot.set(
            this.gridContainer.width / 2,
            this.gridContainer.height / 2
        );


        // IMPORTANT: ensure grid sits at 0,0 so mask aligns perfectly
        this.gridContainer.position.set(0, 0);
    }

    private drawMaskCorrectSize() {
        this.maskShape.clear();

        const totalWidth = this.gridContainer.width;
        const totalHeight = this.gridContainer.height;

        this.maskShape.beginFill(0xffffff);
        this.maskShape.drawRect(0, 0, totalWidth, totalHeight);
        this.maskShape.endFill();

        // align mask pivot same as grid
        this.maskShape.pivot.set(totalWidth / 2, totalHeight / 2);

        // align mask position with grid exactly → FIXES CUTTING
        this.maskShape.position.set(this.gridContainer.x, this.gridContainer.y);
    }
}

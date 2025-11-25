import { Container, Graphics } from "pixi.js";
import { SlotTile } from "./SlotTile";

const brownRectagle = "/raw-assets/pirate/slot-symbol/brown-rectangle.png";
const blueRectangle = "/raw-assets/pirate/slot-symbol/blue-rectangle.png";
const goldRectangle = "/raw-assets/pirate/slot-symbol/gold-rectangle.png";

const SymbolLibrary = {
    0: {
        bg: brownRectagle,
        icon: "/raw-assets/pirate/slot-symbol/bomb.png",
    },
    1: {
        bg: brownRectagle,
        icon: "/raw-assets/pirate/slot-symbol/jolly-roger.png",
    },
    2: {
        bg: brownRectagle,
        icon: "/raw-assets/pirate/slot-symbol/swords.png",
    },
    3: {
        bg: brownRectagle,
        icon: "/raw-assets/pirate/slot-symbol/captain-hat.png",
    },
    4: {
        bg: brownRectagle,
        icon: "/raw-assets/pirate/slot-symbol/beer-jug.png",
    },
    5: {
        bg: brownRectagle,
        icon: "/raw-assets/pirate/slot-symbol/anchor.png",
    },
    6: {
        bg: brownRectagle,
        icon: "/raw-assets/pirate/slot-symbol/gold-canon.png",
    },
    7: {
        bg: goldRectangle,
        icon: "/raw-assets/pirate/slot-symbol/jackpot-chest.png",
    },
    8: {
        bg: blueRectangle,
        icon: "/raw-assets/pirate/slot-symbol/gold-apple.png",
    },
    9: {
        bg: blueRectangle,
        icon: "/raw-assets/pirate/slot-symbol/pirate-coin.png",
    },
    10: {
        bg: blueRectangle,
        icon: "/raw-assets/pirate/slot-symbol/gold-bar.png",
    },
};

export class SlotGridMask extends Container {
    private rows = 5;
    private cols = 5;

    private cellSize = 140;
    private spacing = 14;

    private maskContainer!: Container;
    private maskShape!: Graphics;
    private gridContainer!: Container;

    // 5×5 matrix controlling tile symbols
    public gridMatrix: number[][] = [
        [7, 2, 10, 4, 1],
        [9, 3, 6, 8, 5],
        [4, 1, 9, 7, 3],
        [10, 5, 2, 6, 8],
        [3, 7, 4, 1, 9]
    ];

    private tileGrid: SlotTile[][] = [];

    constructor() {
        super();
        this.init();
    }

    private async init() {
        this.maskContainer = new Container();
        this.addChild(this.maskContainer);

        this.maskShape = new Graphics();
        this.maskContainer.addChild(this.maskShape);

        this.maskContainer.mask = this.maskShape;

        this.gridContainer = new Container();
        this.maskContainer.addChild(this.gridContainer);

        await this.createGrid();
        this.drawMaskCorrectSize();
    }

    // -----------------------------
    // CREATE TILES BASED ON MATRIX
    // -----------------------------
    private async createGrid() {
        this.gridContainer.removeChildren();
        this.tileGrid = [];

        const loadPromises: Promise<void>[] = [];

        for (let r = 0; r < this.rows; r++) {
            const rowTiles: SlotTile[] = [];

            for (let c = 0; c < this.cols; c++) {
                const symbolKey = this.gridMatrix[r][c];

                const tile = new SlotTile(symbolKey, SymbolLibrary);

                const promise = new Promise<void>((resolve) => tile.once("loaded", resolve));
                loadPromises.push(promise);

                tile.x = c * (this.cellSize + this.spacing) + this.cellSize / 2;
                tile.y = r * (this.cellSize + this.spacing) + this.cellSize / 2;

                this.gridContainer.addChild(tile);
                rowTiles.push(tile);
            }
            this.tileGrid.push(rowTiles);
        }

        await Promise.all(loadPromises);

        this.gridContainer.pivot.set(
            this.gridContainer.width / 2,
            this.gridContainer.height / 2
        );

        this.gridContainer.position.set(0, 0);
    }

    // -----------------------------
    // MASK
    // -----------------------------
    private drawMaskCorrectSize() {
        this.maskShape.clear();

        const w = this.gridContainer.width;
        const h = this.gridContainer.height;

        this.maskShape.beginFill(0xffffff);
        this.maskShape.drawRect(0, 0, w, h);
        this.maskShape.endFill();

        this.maskShape.pivot.set(w / 2, h / 2);
        this.maskShape.position.set(0, 0);
    }

    // -----------------------------
    // UPDATE GRID USING NEW MATRIX
    // -----------------------------
    public async setMatrix(matrix: number[][]) {
        this.gridMatrix = matrix;

        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.cols; c++) {
                const tile = this.tileGrid[r][c];
                const key = matrix[r][c];

                await tile.setSymbolKey(key);
            }
        }
    }
}

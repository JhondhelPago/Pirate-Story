import { Container, Graphics, Sprite, Assets } from "pixi.js";

export class SlotMachineGrid {
    public rows: number;
    public columns: number;
    public tileSize: number;

    public grid: number[][] = [];       // symbol indexes
    public symbols: Sprite[] = [];      // actual sprites
    public container: Container;        // main reel container
    public mask: Graphics;

    constructor(columns: number, rows: number, tileSize: number) {
        this.columns = columns;
        this.rows = rows;
        this.tileSize = tileSize;

        this.container = new Container();
        this.mask = new Graphics()
            .rect(0, 0, this.getWidth(), this.getHeight())
            .fill(0xffffff);

        this.container.mask = this.mask;
    }

    public setup(initialGrid: number[][]) {
        this.grid = initialGrid;
        this.renderGrid();
    }

    private renderGrid() {
        this.clearSymbols();

        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.columns; c++) {
                const symbolType = this.grid[r][c];
                this.createSymbol(r, c, symbolType);
            }
        }
    }

    private createSymbol(row: number, col: number, type: number) {
        const sprite = Sprite.from(`/raw-assets/slot/${type}.png`);
        sprite.anchor.set(0.5);

        const pos = this.getViewPosition(row, col);
        sprite.x = pos.x;
        sprite.y = pos.y;

        this.symbols.push(sprite);
        this.container.addChild(sprite);
    }

    private clearSymbols() {
        for (const s of this.symbols) s.destroy();
        this.symbols.length = 0;
    }

    public getViewPosition(row: number, col: number) {
        const offsetX = ((this.columns - 1) * this.tileSize) / 2;
        const offsetY = ((this.rows - 1) * this.tileSize) / 2;

        return {
            x: col * this.tileSize - offsetX,
            y: row * this.tileSize - offsetY,
        };
    }

    public getWidth() {
        return this.columns * this.tileSize;
    }

    public getHeight() {
        return this.rows * this.tileSize;
    }
}

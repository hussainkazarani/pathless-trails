import config from '../../../shared/config.js';

export class Cell {
    constructor(x, y, number = null) {
        this.x = x; //column
        this.y = y; //row
        this.size = config.cellSize;

        this.walkable = false; // default to non-walkable
        this.color = '#000000'; // default color (black for blocked)
        this.number = number;
    }

    draw(ctx) {
        this.color = this.walkable ? 'white' : 'pink';
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }
}

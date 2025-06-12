import config from '../shared/config.js';

// BACKEND CLASSES
export class Cell {
    constructor(x, y) {
        this.x = x; //column
        this.y = y; //row
        this.size = config.cellSize;

        this.walkable = false;
        this.visited = false;
        this.color = '#FFFCF2';
    }
}

export class Maze {
    constructor(columns, rows) {
        this.columns = columns;
        this.rows = rows;
        this.cellsMatrix = [];
    }

    initializeCells() {
        this.cellsMatrix = [];
        //cellsMatrix[y][x] = cellsMatrix[i][j]
        for (let row = 0; row < this.rows; row++) {
            this.cellsMatrix[row] = [];
            for (let col = 0; col < this.columns; col++) {
                this.cellsMatrix[row][col] = new Cell(col, row); //Cell(x,y)
            }
        }
    }
}

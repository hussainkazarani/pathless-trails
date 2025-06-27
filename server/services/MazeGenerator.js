// generating a random maze
export class MazeGenerator {
    constructor(maze) {
        this.maze = maze;
    }

    generateDFS() {
        const rows = this.maze.rows;
        const columns = this.maze.columns;

        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < columns; x++) {
                const cell = this.maze.cellsMatrix[y][x];
                if (cell) {
                    cell.walkable = Math.random() < 0.7; // 70% chance walkable
                }
            }
        }
    }
}

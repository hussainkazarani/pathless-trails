import { Flag, Maze } from './Classes.js'; //backend
import { MazeGenerator } from './MazeGenerator.js'; //backend
import { model } from './Model.js';
export { model };
import config from '../shared/config.js';

// ========== HOME ==========
// Check if a username is available to join the game
export function isUsernameAvailable(username) {
    return !model.users.includes(username);
}

// ========== ROOM ON-LOAD ==========

// ========== ROOM ON-CLICK ==========
// Check if a room name is available
export function isRoomAvailable(room) {
    return !Object.keys(model.rooms).includes(room);
}

// Create a room with a generated maze
export function createRoomWithMaze(username, room) {
    const maze = new Maze(config.cols, config.rows);
    maze.initializeCells();
    const generator = new MazeGenerator(maze);
    generator.generateDFS();
    const flag = new Flag();
    const availableCells = getAvailableCellsFromMaze(maze.cellsMatrix);
    const roomFlagPositions = flag.generateRandomPosition(availableCells);
    model.addRoom(room, maze.cellsMatrix, username, roomFlagPositions);
}

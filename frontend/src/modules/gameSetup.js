import config from '../../../shared/config.js';
import { animate } from '../main.js';
import { state } from './state.js';
import { Maze } from '../game/Maze.js';
import { Player } from '../game/Player.js';
import { CollisionManager } from '../game/CollisionManager.js';
import { CameraManager } from '../game/CameraManager.js';

export function setupCanvas(roomData) {
    let username = localStorage.getItem('playerToken');

    state.maze = new Maze();
    state.maze.loadData(roomData.maze);

    state.allPlayers = roomData.players;
    state.player = new Player(roomData.players[username]);

    state.buffer = createBuffer(state.maze.rows * config.cellSize, state.maze.columns * config.cellSize);
    state.bufferCtx = state.buffer.getContext('2d');
    state.maze.drawCells(state.bufferCtx);

    state.collisionManager = new CollisionManager(state.maze, state.flagManager);
    state.camera = new CameraManager(canvas);

    animate();
}

export function createBuffer(width, height) {
    const buf = document.createElement('canvas');
    buf.width = width;
    buf.height = height;
    return buf;
}

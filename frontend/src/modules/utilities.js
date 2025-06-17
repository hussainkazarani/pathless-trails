import { socket } from '../../socket.js';
import { state } from './state.js';

export function onLoad(startBtn) {
    let username = localStorage.getItem('playerToken');
    let room = localStorage.getItem('room');

    //join room with socket and check creator status
    socket.emit('game:join', username, room);
    console.log(`(F) ${username} has joined room: ${room}`);
}

// get new flags to spawn
export function spawnFlags(count, lastCollected = null) {
    socket.emit('game:request-flags', { count, lastCollected });
}

export function redirectToHomeWithLocalStorage() {
    localStorage.removeItem('room');
    navigateWithFade('/frontend/src/pages/rooms.html');
}

export function sendPlayerUpdate() {
    const playerState = state.player.getState();
}

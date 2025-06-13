import { state } from './state.js';

export function onLoad(startBtn) {
    let username = localStorage.getItem('playerToken');
    let room = localStorage.getItem('room');

    //join room with socket and check creator status
    console.log(`(F) ${username} has joined room: ${room}`);
}

export function redirectToHomeWithLocalStorage() {
    localStorage.removeItem('room');
    navigateWithFade('/frontend/src/pages/rooms.html');
}

export function sendPlayerUpdate() {
    const playerState = state.player.getState();
}

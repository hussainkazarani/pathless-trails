export function onLoad(startBtn) {
    let username = localStorage.getItem('playerToken');
    let room = localStorage.getItem('room');

    console.log(`(F) ${username} has joined room: ${room}`);
}

export function redirectToHomeWithLocalStorage() {
    localStorage.removeItem('room');
    navigateWithFade('/frontend/src/pages/rooms.html');
}

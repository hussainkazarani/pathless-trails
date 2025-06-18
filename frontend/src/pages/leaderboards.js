const playersDiv = document.querySelector('.players');
const username = localStorage.getItem('playerToken');
let internalNavigation = false;

window.addEventListener('load', () => {
    if (username == null) {
        redirectToHome();
        return;
    }
});

document.querySelector('.backbtn').addEventListener('click', () => {
    internalNavigation = true;
    if (verifyPlayer()) navigateWithFade('/frontend/src/pages/rooms.html');
});

window.addEventListener('beforeunload', (event) => {
    // Send a signal to the server to remove the player
    if (!internalNavigation) {
        console.log('Removed LocalStorage in leaderboards');
        localStorage.clear();
    }
});

// Verify the LocalStorage and backend value of username
async function verifyPlayer() {
    // no token
    const token = localStorage.getItem('playerToken');
    if (!token) {
        redirectToHome();
        return false;
    }

    return true;
}

function redirectToHome() {
    localStorage.clear();
    window.location.replace('/frontend/src/pages/home.html');
}

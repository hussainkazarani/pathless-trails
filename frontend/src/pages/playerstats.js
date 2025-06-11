const p1Elements = document.getElementsByClassName('p1');
const p2Elements = document.getElementsByClassName('p2');

const p1 = p1Elements.length > 0 ? p1Elements[0] : null;
const p2 = p2Elements.length > 0 ? p2Elements[0] : null;
let internalNavigation = false;

window.addEventListener('load', () => {
    const username = localStorage.getItem('playerToken');
    if (username == null) {
        redirectToHome();
        return;
    }
    if (!p1 && !p2) return;
});

document.querySelector('.backbtn').addEventListener('click', () => {
    internalNavigation = true;
    if (verifyPlayer()) navigateWithFade('/frontend/src/pages/rooms.html');
});

// Send a signal to the server to remove the player
window.addEventListener('beforeunload', (event) => {
    if (!internalNavigation) {
        console.log('Removed LocalStorage in player statistics');

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

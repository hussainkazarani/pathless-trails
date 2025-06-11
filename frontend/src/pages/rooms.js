import { validateName } from '../transitions.js';

const createBtn = document.getElementById('create-game');
const inputRoom = document.getElementById('input-create-game');
const activity = document.querySelector('.online-players');
let resetTimeout;
let internalNavigation = false;

createBtn.addEventListener('click', () => {
    internalNavigation = true;
    if (verifyPlayer()) {
        if (inputRoom.value.length > 0) {
            if (!validateName(inputRoom.value.trim())) {
                inputRoom.style.border = '2px solid #8f3d3d';
                inputRoom.style.backgroundColor = '#e0b8b8';
                // remove after 3 seconds
                clearTimeout(resetTimeout);
                resetTimeout = setTimeout(() => {
                    inputRoom.style.border = '';
                    inputRoom.style.backgroundColor = '';
                }, 3000);
                return;
            }
        }
    }
});

window.addEventListener('load', () => {
    let localStorageUsername = localStorage.getItem('playerToken');
    if (localStorageUsername == null) {
        redirectToHome();
        return;
    }

    // }
});

const leaderboardBtn = document.getElementById('leaderboardBtn');
leaderboardBtn.addEventListener('click', () => {
    internalNavigation = true;
    if (verifyPlayer()) {
        console.log(`(F) Going to leaderboads`);
        navigateWithFade('/frontend/src/pages/leaderboards.html');
    }
});

const playerBtn = document.getElementById('playerBtn');
playerBtn.addEventListener('click', () => {
    internalNavigation = true;
    if (verifyPlayer()) {
        console.log(`(F) Going to player statistics`);
        navigateWithFade('/frontend/src/pages/playerstats.html');
    }
});

// ==== RELOAD ====
// Send a signal to the server to remove the player
window.addEventListener('beforeunload', (event) => {
    if (!internalNavigation) {
        console.log('Removed LocalStorage in rooms');

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
    navigateWithFade('/frontend/src/pages/home.html');
}

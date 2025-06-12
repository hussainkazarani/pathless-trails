import { ctx, canvas } from './canvas/initCanvas.js';
import { onLoad } from './modules/utilities.js';
import { state } from './modules/state.js';

const startBtn = document.getElementById('start-game-timer');
startBtn.addEventListener('click', () => socket.emit('game:verify'));
window.addEventListener('load', () => onLoad(startBtn));

export function animate() {
    clearScene();
    drawMaze();
    state.animationID = requestAnimationFrame(animate);
}

// --- Helpers ---
function clearScene() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawMaze() {
    ctx.drawImage(state.buffer, 0, 0);
}

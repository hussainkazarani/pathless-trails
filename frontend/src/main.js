import { ctx, canvas } from './canvas/initCanvas.js';
import { onLoad, sendPlayerUpdate } from './modules/utilities.js';
import config from '../../shared/config.js';
import { state } from './modules/state.js';

const startBtn = document.getElementById('start-game-timer');
startBtn.addEventListener('click', () => socket.emit('game:verify'));
window.addEventListener('load', () => onLoad(startBtn));

export function animate() {
    clearScene();
    applyCamera();
    drawMaze();
    drawLocalPlayer();
    handleLocalPlayerMovement();
    resetCamera();
    state.animationID = requestAnimationFrame(animate);
}

// --- Helpers ---
function clearScene() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function applyCamera() {
    state.camera.followPlayer(state.player);
    state.camera.applyTransform(ctx);
}

function drawMaze() {
    ctx.drawImage(state.buffer, 0, 0);
}

function drawLocalPlayer() {
    state.player.draw(ctx);
}

function resetCamera() {
    state.camera.resetTransform(ctx);
}

function handleLocalPlayerMovement() {
    const { newX, newY, oldX, oldY, moved } = state.player.getProposedMove();
    if (!moved) return;

    let finalX = newX;
    let finalY = newY;

    // Horizontal movement & collision
    if (newX !== oldX) {
        const direction = newX > oldX ? 'right' : 'left';
        if (!state.collisionManager.canMove(newX, oldY, state.player.playerSize)) {
            finalX = state.collisionManager.getCollisionAdjustedPosition(direction, oldX, newX, oldY);
        }
    }

    // Vertical movement & collision
    if (newY !== oldY) {
        const direction = newY > oldY ? 'down' : 'up';
        if (!state.collisionManager.canMove(finalX, newY, state.player.playerSize)) {
            finalY = state.collisionManager.getCollisionAdjustedPosition(direction, oldY, newY, finalX);
        }
    }

    // Apply movement
    if (finalX !== state.player.x || finalY !== state.player.y) {
        const collectedFlag = state.collisionManager.checkFlagCollision(finalX, finalY, config.playerSize);
        if (collectedFlag) {
            state.player.flagsCollected++;
        }

        state.player.setPosition(finalX, finalY);
        sendPlayerUpdate();
    }
}

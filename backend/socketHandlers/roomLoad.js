import * as ModelManager from '../modelManager.js';

export function handleRoomOnLoadEvents(socket, io) {
    // add player in the Model.users
    socket.on('player:set-username', (username) => {
        socket.data.username = username;
        ModelManager.registerPlayer(username);
        console.log(`(B) Set backend variable Username: ${username}`);
    });

    // send all current games to particular player
    socket.on('room:get-list', () => {
        console.log(`(B) Getting games from Model`);
        socket.emit('room:set-list', ModelManager.model.rooms);
    });

    // get all the players in gamedata.players
    socket.on('player:get-online-status', () => {
        console.log(`(B) Getting Users from Model`);
        io.emit('player:set-online-status', ModelManager.model.users);
    });
}

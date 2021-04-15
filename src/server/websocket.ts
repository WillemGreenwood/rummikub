import { buildSimpleGameStateMessage, buildHostDeclarationMessage } from './jsonBuilder';
import { Game, Player, games } from './game';

/**
 * Configures a web socket and handles setting up/joining a game
 */
export function configureWebsocket(ws /* websocket */, req /* request */): void {
    var game: Game;
    var player: Player;
    if (/^rummikub-create$/.test(req.protocol)) {
        // New game request
        game = new Game(ws);
        player = game.host;
        ws.rummikub_player = player;
        ws.rummikub_game = game;
        configureOnMessage(ws);
        configureHostOnClose(ws);
    } else if (/^rummikub-join-[A-Z]{6}$/.test(req.protocol)) {
        // Join game request
        game = games[req.protocol.substring(14)];
        // If game is unknown, close connection
        if (game == undefined) return ws.close();
        player = game.join(ws);
        ws.rummikub_player = player;
        ws.rummikub_game = game;
        configureOnMessage(ws);
        configureOnClose(ws);
    }
    ws.send(buildSimpleGameStateMessage(game, player));
};

function configureOnMessage(ws /* websocket */): void {
    const player: Player = ws.rummikub_player;
    const game: Game = ws.rummikub_game;

    ws.on('message', (msg) => {

    });
}

function configureOnClose(ws /* websocket */): void {
    const player: Player = ws.rummikub_player;
    const game: Game = ws.rummikub_game;

    ws.on('close', () => {
        game.drop(player);
    });
}

function configureHostOnClose(ws /* websocket */): void {
    // Host must assign a new host OR close game entirely
    const player: Player = ws.rummikub_player;
    const game: Game = ws.rummikub_game;

    ws.on('close', () => {
        game.drop(player);
        if (game.players.length > 0) {
            game.host = game.players[0];
            game.host.isHost = true;
            configureHostOnClose(game.host.ws);
            game.sendToAll(buildHostDeclarationMessage(game.host));
        }
    });
}

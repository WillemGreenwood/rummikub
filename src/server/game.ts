import { tilesPerPlayer, firstPutdownMinimum } from '../common/gameDefaults'
import { buildDropPlayerMessage } from './jsonBuilder';

/** All active games */
export const games: { [propName: string]: Game } = {};

/**
 * Main class for managing game;
 * - Records players and their associated websockets
 * - Sends updates to players
 * - Records server-side game state (not implemented)
 */
export class Game {
    constructor(ws /* websocket */) {
        var roomCode = '';
        while (games[roomCode] != undefined) roomCode = randomIdSupplier();
        games[roomCode] = this;
        this.roomCode = roomCode;
        this.host = new Player(randomIdSupplier(), 'Host', ws, true);
        this.players.push(this.host);

        this.tilesPerPlayer = tilesPerPlayer;
        this.firstPutdownMinimum = firstPutdownMinimum;

        this.activePlayer = this.host;
    }

    roomCode: string;
    host: Player;
    players: Player[];

    tilesPerPlayer: number;
    firstPutdownMinimum: number;

    activePlayer: Player;

    /**
     * Adds a new player to the game
     */
    join(ws): Player {
        return null;
    }

    /**
     * Removes a player from the game
     */
    drop(player: Player): void {
        const playerIndex = this.players.indexOf(player);
        this.players.splice(playerIndex);
        if (this.activePlayer == player && this.players.length > 0) {
            this.setActivePlayer(this.players[playerIndex < this.players.length ? playerIndex : 0]);
        }
        // TODO: remove from gamestate
        this.sendToAll(buildDropPlayerMessage(player));
    }

    /**
     * Sends a message to all players via their websocket
     */
    sendToAll(msg: any): void {
        for (const player of this.players) {
            player.send(msg);
        }
    }

    /**
     * Sends a message to all players but one (for fowarding player moves etc.)
     */
    send(from: Player, msg: any): void {
        for (const to of this.players) {
            if (to.id != from.id) {
                to.send(msg);
            }
        }
    }

    /**
     * Sets which player's turn it is
     */
    setActivePlayer(player: Player): void {
        this.activePlayer = player
        // TODO: send active player message
    }
}

export class Player {
    constructor(id: string, username: string, ws /* websocket */, isHost=false) {
        this.id = id;
        this.username = username;
        this.ws = ws;
        this.isHost = isHost
    }

    id: string;
    username: string;
    ws /* websocket */;
    isHost: boolean;

    /**
     * Send a message via the player's web socket
     */
    send(msg: any): void {
        this.ws.send(msg);
    }
}

/**
 * Generates a random string of six uppercase letters (used for player ids and room codes)
 */
function randomIdSupplier(): string {
    const rChar = () => String.fromCharCode(Math.floor(Math.random() * 26) + 65);
    return rChar() + rChar() + rChar() + rChar() + rChar() + rChar();
}
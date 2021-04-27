import { msgJson } from "../../common/schima";
import { IGame } from "./IGame";
import { IPlayer } from "./IPlayer";

export class Game implements IGame {
    constructor() {
        this.isClosed = false;
        this.isRegistered = false;
        this.players = [];
        this.host = null;
        this.roomCode = null;
    }
    
    static activeGames: { [name: string]: Game } = {};

    isClosed: boolean;
    isRegistered: boolean;
    players: IPlayer[];
    host: IPlayer;
    roomCode: string;

    setHost(player: IPlayer): void {
        this._closedCheck();
        this.addPlayer(player);
        this.host = player;
    }

    addPlayer(player: IPlayer): boolean {
        this._closedCheck();
        if (this.players.includes(player)) {
            return false;
        }
        this.players.push(player);
        return true;
    }
    
    removePlayer(player: IPlayer): boolean {
        this._closedCheck();
        const index = this.players.indexOf(player);
        if (index == -1) {
            return false;
        }
        this.players.splice(index, 1);
        return true;
    }

    isEmpty(): boolean {
        return this.players.length == 0;
    }
    
    send(json: msgJson): void {
        this._closedCheck();
        this.forwardFrom(null, json);
    }
    
    forwardFrom(player: IPlayer, json: msgJson): void {
        this._closedCheck();
        for (const player1 of this.players) {
            if (player1 !== player) {
                player1.send(json);
            }
        }
    }

    getRoomCode(): string {
        return this.roomCode;
    }

    getGameByRoomCode(code: string): IGame {
        return Game.activeGames[code] == undefined ? null : Game.activeGames[code];
    }
    
    register(): string {
        this._closedCheck();
        if (!this.isRegistered) {
            this.roomCode = this._generateRoomCode();
            Game.activeGames[this.roomCode] = this;
            this.isRegistered = true;
        }
        return this.roomCode;
    }
    
    deregister(): void {
        this._closedCheck();
        if (this.isRegistered) {
            delete Game.activeGames[this.roomCode];
            this.roomCode = null;
            this.isRegistered = false;
        }
    }
    
    getIsRegistered(): boolean {
        return this.isRegistered;
    }

    close(): void {
        this._closedCheck();
        this.deregister();
        for (const player of this.players) {
            player.close();
        }
        this.isClosed = true;
    }

    _closedCheck(): void {
        if (this.isClosed) {
            throw 'ClosedGameError: Attempted non-read operation on closed game.'
        }
    }

    _generateRoomCode(): string {
        const rChar = () => String.fromCharCode(Math.floor(Math.random() * 25) + 97);
        var code: string;
        do {
            code = rChar() + rChar() + rChar() + rChar() + rChar() + rChar();
        } while (Game.activeGames[code] != undefined);
        return code;
    }
}
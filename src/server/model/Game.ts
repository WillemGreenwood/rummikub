import { msgJson } from "../../common/schima";
import { IGame } from "./IGame";
import { IPlayer } from "./IPlayer";

export class Game implements IGame {
    constructor() {
        throw new Error("Method not implemented.");
    }
    
    static activeGames: { [name: string]: Game } = {};

    closed = false;

    setHost(player: IPlayer): void {
        throw new Error("Method not implemented.");
    }

    addPlayer(player: IPlayer): boolean {
        throw new Error("Method not implemented.");
    }
    
    removePlayer(player: IPlayer): boolean {
        throw new Error("Method not implemented.");
    }
    
    send(json: msgJson): void {
        throw new Error("Method not implemented.");
    }
    
    forwardFrom(player: IPlayer, json: msgJson): void {
        throw new Error("Method not implemented.");
    }

    getRoomCode(): string {
        throw new Error("Method not implemented.");
    }

    getGameByRoomCode(code: string): IGame {
        throw new Error("Method not implemented.");
    }
    
    register(): string {
        throw new Error("Method not implemented.");
    }
    
    deregister(): void {
        throw new Error("Method not implemented.");
    }
    
    getRegistered(): boolean {
        throw new Error("Method not implemented.");
    }

    close(): void {
        throw new Error("Method not implemented.");
    }
}
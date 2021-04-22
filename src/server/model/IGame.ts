import { msgJson } from "../../common/schima";
import { IPlayer } from "./IPlayer";

export interface IGame {
    /**
     * Adds the player to the game (if absent) and sets them as the host.
     */
    setHost(player: IPlayer): void;

    addPlayer(player: IPlayer): boolean;

    removePlayer(player: IPlayer): boolean;

    /**
     * Send a message to all players.
     */
    send(json: msgJson): void;

    /**
     * Sends a message to all but one of the game's players.
     */
    forwardFrom(player: IPlayer, json: msgJson): void;

    getRoomCode(): string;

    getGameByRoomCode(code: string): IGame;

    /**
     * Add this game to the list of registered games, returns the room code for the game.
     */
    register(): string;

    /**
     * Remove this game form the list of registerd games.
     */
    deregister(): void;

    /**
     * Returns if this game is in the list of registered games.
     */
    getRegistered(): boolean;

    /**
     * Deregister the game (if registered), and close all player connections.
     */
    close(): void;
}
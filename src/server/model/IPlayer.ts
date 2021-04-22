import { msgJson } from "../../common/schima";

export interface IPlayer {
    setWebsocket(ws /* websocket */): void;

    send(json: msgJson): void;

    /**
     * Close the player's web socket and remove this player from the game.
     */
    close(): void;
}
import { msgJson } from "../../common/schima";
import { IPlayer } from "./IPlayer";

export class Player implements IPlayer {
    setWebsocket(ws: any): void {
        throw new Error("Method not implemented.");
    }
    
    send(json: msgJson): void {
        throw new Error("Method not implemented.");
    }

    close(): void {
        throw new Error("Method not implemented.");
    }
}
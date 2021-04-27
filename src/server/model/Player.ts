import { msgJson } from "../../common/schima";
import { IPlayer } from "./IPlayer";

export class Player implements IPlayer {
    constructor() {
        this.ws = null;
        this.isClosed = false;
    }

    ws /* websocket */;
    isClosed: boolean;

    setWebsocket(ws: any): void {
        this._closedCheck();
        this.ws = ws;
    }
    
    send(json: msgJson): void {
        this._closedCheck();
        this.ws.send(json);
    }

    close(): void {
        this._closedCheck();
        this.ws.close();
        this.isClosed = true;
    }

    _closedCheck(): void {
        if (this.isClosed) {
            throw 'ClosedPlayerError: Attempted non-read operation on closed game.'
        }
    }
}
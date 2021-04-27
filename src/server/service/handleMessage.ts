import { msgJson } from "../../common/schima";
import { IHandleMessage } from "./IHandleMessage";

export function getHandleMessage(): IHandleMessage {
    return (json: msgJson) => {
        return null;
    }
}
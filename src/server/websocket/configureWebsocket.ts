import * as wsp from '../../common/websocketProtocols'
import { IGame } from '../model/IGame'
import { IPlayer } from '../model/IPlayer';
import { IHandleMessage } from '../service/IHandleMessage';
import { IConfigureWebsocket } from './IConfigureWebsocket'

export function getConfigureWebsocket(getGame: () => IGame, getPlayer: () => IPlayer, handleMessage: IHandleMessage): IConfigureWebsocket {
    return function(ws /* websocket */, req /* request */): void {
        var game: IGame;
        var player = getPlayer();
        player.setWebsocket(ws);
        
        if (wsp.CREATE_GAME_PROTOCOL.matches(req.protocol)) {
            game = getGame();
            game.setHost(player);
            game.register();
        } else if (wsp.JOIN_GAME_PROTOCOL.matches(req.protocol)) {
            const roomCode = req.protocol.substring(req.protocol.length - 6);
            game = getGame().getGameByRoomCode(roomCode);
            if (game != null) {
                game.addPlayer(player);
            } else {
                player.close();
                return;
            }
        }
        
        ws.on('message', (message) => {
            handleMessage(message.data);
        })

        ws.on('close', () => {
            game.removePlayer(player);
            if (game.isEmpty()) {
                game.close();
            }
        });
    }
}
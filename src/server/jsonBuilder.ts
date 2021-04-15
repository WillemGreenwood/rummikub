import { SimpleGameStateSchima, HostDeclarationSchima, PlayerSchima, DropPlayerSchima } from "../common/schima"
import { Game, Player } from "./game";

export function buildHostDeclarationMessage(host: Player): HostDeclarationSchima {
    return {
        msgType: 'host-declaration',
        host: host.id
    };
}

export function buildDropPlayerMessage(player: Player): DropPlayerSchima {
    return {
        msgType: 'drop-player',
        player: {
            id: player.id,
            username: player.username,
            isHost: player.isHost
        }
    };
}

export function buildSimpleGameStateMessage(game: Game, targetPlayer: Player): SimpleGameStateSchima {
    const players: PlayerSchima[] = [];
    for (const player of game.players) {
        if (player.id != targetPlayer.id) {
            players.push({
                id: player.id,
                username: player.username,
                isHost: player.isHost
            });
        }
    }
    return {
        msgType: 'simple-game-state',
        roomCode: game.roomCode,
        players: players
    };
}

export interface msgJson extends JSON {
    msgType: string
};

export interface HostDeclarationSchima extends msgJson {
    msgType: 'host-declaration';
    host: string;
}

export interface DropPlayerSchima extends msgJson {
    msgType: 'drop-player';
    player: PlayerSchima;
}

export interface PlayerSchima {
    id: string;
    username: string;
    isHost: boolean;
};

export interface SimpleGameStateSchima extends msgJson {
    msgType: 'simple-game-state';
    roomCode: string;
    players: PlayerSchima[];
};

export interface GameStateSchima extends msgJson {
    msgType: 'game-state';
    roomCode: string;
    players: PlayerSchima[];
    gameState: {
        yourTiles: string[];
        drawpileEmpty: boolean;
        openTiles: string[][];
    }
};

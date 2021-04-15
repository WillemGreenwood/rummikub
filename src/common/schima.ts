export interface HostDeclarationSchima {
    msgType: 'host-declaration';
    host: string;
}

export interface DropPlayerSchima {
    msgType: 'drop-player';
    player: PlayerSchima;
}

export interface PlayerSchima {
    id: string;
    username: string;
    isHost: boolean;
};

export interface SimpleGameStateSchima {
    msgType: 'simple-game-state';
    roomCode: string;
    players: PlayerSchima[];
};

export interface GameStateSchima {
    msgType: 'game-state';
    roomCode: string;
    players: PlayerSchima[];
    gameState: {
        yourTiles: string[];
        drawpileEmpty: boolean;
        openTiles: string[][];
    }
};

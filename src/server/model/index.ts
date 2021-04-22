import { Game } from "./Game";
import { IGame } from "./IGame";
import { IPlayer } from "./IPlayer";
import { Player } from "./Player";

export const getGame: () => IGame = () => new Game();
export const getPlayer: () => IPlayer = () => new Player();
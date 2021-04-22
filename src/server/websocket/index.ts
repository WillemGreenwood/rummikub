import { IConfigureWebsocket } from './IConfigureWebsocket'
import { getConfigureWebsocket } from './configureWebsocket'
import { getGame, getPlayer } from '../model';

export const configureWebsocket: IConfigureWebsocket = getConfigureWebsocket(getGame, getPlayer);
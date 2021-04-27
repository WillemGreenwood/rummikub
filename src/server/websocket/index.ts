import { IConfigureWebsocket } from './IConfigureWebsocket'
import { getConfigureWebsocket } from './configureWebsocket'
import { getGame, getPlayer } from '../model';
import { handleMessage } from '../service';

export const configureWebsocket: IConfigureWebsocket = getConfigureWebsocket(getGame, getPlayer, handleMessage);
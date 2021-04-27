import { IGame } from "../../../src/server/model/IGame";
import { IPlayer } from "../../../src/server/model/IPlayer";
import { IHandleMessage } from "../../../src/server/service/IHandleMessage";
import { getConfigureWebsocket } from "../../../src/server/websocket/configureWebsocket";
import { IConfigureWebsocket } from "../../../src/server/websocket/IConfigureWebsocket";

var mockGame: IGame;
var mockGame2: IGame;
var mockPlayer: IPlayer;
var mockWs: any;
var mockReq: any;
var mockHandleMessage: IHandleMessage;
var configureWebsocket: IConfigureWebsocket;

beforeEach(() => {
    mockGame = <IGame><unknown>{
        setHost: jest.fn((player: IPlayer) => {}),
        register: jest.fn(() => {}),
        getGameByRoomCode: jest.fn((roomCode: string) => roomCode == 'aaaaaa' ? mockGame2 : null),
        removePlayer: jest.fn((player: IPlayer) => {}),
        isEmptyReturnValue: false,
        isEmpty: jest.fn(() => (<any>mockGame).isEmptyReturnValue),
        close: jest.fn(() => {})
    };
    mockGame2 = <IGame><unknown>{
        addPlayer: jest.fn((player: IPlayer) => {})
    };
    mockPlayer = <IPlayer><unknown>{
        setWebsocket: jest.fn((ws) => {}),
        close: jest.fn(() => {})
    };
    mockWs = {
        listeners: {},
        on: jest.fn((event, listener) => {
            mockWs.listeners[event] = listener;
        })
    };
    mockReq = { protocol: 'rummikub-create' };
    mockHandleMessage = jest.fn((json) => {});
    configureWebsocket = getConfigureWebsocket(() => mockGame, () => mockPlayer, mockHandleMessage);
});

test('Registers new game', () => {
    configureWebsocket(mockWs, mockReq);
    expect(mockGame.setHost).toBeCalledWith(mockPlayer);
    expect(mockGame.register).toBeCalled();
});

test('Fetches existing game', () => {
    mockReq.protocol = 'rummikub-join-aaaaaa';
    configureWebsocket(mockWs, mockReq);
    expect(mockGame.getGameByRoomCode).toBeCalledWith('aaaaaa');
});

test('Adds player to game', () => {
    mockReq.protocol = 'rummikub-join-aaaaaa';
    configureWebsocket(mockWs, mockReq);
    expect(mockGame2.addPlayer).toBeCalledWith(mockPlayer);
});

test('Closes on non-existant game', () => {
    mockReq.protocol = 'rummikub-join-bbbbbb';
    configureWebsocket(mockWs, mockReq);
    expect(mockGame.getGameByRoomCode).toBeCalledWith('bbbbbb');
    expect(mockPlayer.close).toBeCalled();
});

test('Adds message handler', () => {
    const dummyData = { dummy: 'data'}
    const dummyMessage = { data: dummyData }
    configureWebsocket(mockWs, mockReq);
    mockWs.listeners['message'](dummyMessage);
    expect(mockWs.on).toBeCalled();
    expect(mockHandleMessage).toBeCalledWith(dummyData);
});

test('Adds close handler', () => {
    configureWebsocket(mockWs, mockReq);
    mockWs.listeners['close']();
    expect(mockGame.removePlayer).toBeCalledWith(mockPlayer);
    expect(mockGame.isEmpty).toReturnWith(false);
});

test('Close handler ends empty game', () => {
    (<any>mockGame).isEmptyReturnValue = true;
    configureWebsocket(mockWs, mockReq);
    mockWs.listeners['close']();
    expect(mockGame.isEmpty).toReturnWith(true);
    expect(mockGame.close).toBeCalled();
});
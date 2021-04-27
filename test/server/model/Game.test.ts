import { msgJson } from "../../../src/common/schima";
import { Game } from "../../../src/server/model/Game";
import { IPlayer } from "../../../src/server/model/IPlayer";

var game: Game;
var mockPlayer: IPlayer;
var mockPlayer2: IPlayer;
var mockPlayer3: IPlayer;

const roomCode = 'aaaaaa';
const getMockPlayer = () => <IPlayer><unknown>{
        send: jest.fn((json: msgJson) => {}),
        close: jest.fn(() => {})
    };

beforeEach(() => {
    game = new Game();
    mockPlayer = getMockPlayer();
    mockPlayer2 = getMockPlayer();
    mockPlayer3 = getMockPlayer();
});

afterEach(() => {
    Game.activeGames = {};
});

// setHost
test('setHost: Sets host', () => {
    game.setHost(mockPlayer);
    expect(game.host).toBe(mockPlayer);
});

test('setHost: Adds player', () => {
    game.setHost(mockPlayer);
    expect(game.players.includes(mockPlayer)).toBeTruthy();
});

// addPlayer
test('addPlayer: Adds player', () => {
    game.addPlayer(mockPlayer);
    expect(game.players.includes(mockPlayer)).toBeTruthy();
});

test('addPlayer: Returns true on added', () => {
    expect(game.addPlayer(mockPlayer)).toBeTruthy();
});

test('addPlayer: Returns false on already present', () => {
    game.players = [ mockPlayer ];
    expect(game.addPlayer(mockPlayer)).toBeFalsy();
});

// removePlayer
test('removePlayer: Removes player', () => {
    game.players = [ mockPlayer2, mockPlayer, mockPlayer3 ];
    game.removePlayer(mockPlayer);
    expect(game.players.includes(mockPlayer)).toBeFalsy();
});

test('removePlayer: Returns true on removed', () => {
    game.players = [ mockPlayer2, mockPlayer, mockPlayer3 ];
    expect(game.removePlayer(mockPlayer)).toBeTruthy();
});

test('removePlayer: Returns false on not present', () => {
    game.players = [ mockPlayer2, mockPlayer3 ];
    expect(game.removePlayer(mockPlayer)).toBeFalsy();
});

// isEmpty
test('isEmpty: Returns ture', () => {
    expect(game.isEmpty()).toBeTruthy();
});

test('isEmpty: Returns false', () => {
    game.players = [ mockPlayer ];
    expect(game.isEmpty()).toBeFalsy();
});

// send
test('send: Sends to all players', () => {
    const dummyMsg: msgJson = { msgType: 'dummy' };
    game.players = [ mockPlayer, mockPlayer2, mockPlayer3 ];
    game.send(dummyMsg);
    expect(mockPlayer.send).toBeCalledWith(dummyMsg);
    expect(mockPlayer2.send).toBeCalledWith(dummyMsg);
    expect(mockPlayer3.send).toBeCalledWith(dummyMsg);
});

// forwardFrom
test('forwardFrom: Sends to all players bar one', () => {
    const dummyMsg: msgJson = { msgType: 'dummy' };
    game.players = [ mockPlayer, mockPlayer2, mockPlayer3 ];
    game.forwardFrom(mockPlayer, dummyMsg);
    expect(mockPlayer.send).toBeCalledTimes(0);
    expect(mockPlayer2.send).toBeCalledWith(dummyMsg);
    expect(mockPlayer3.send).toBeCalledWith(dummyMsg);
});

// getRoomCode
test('getRoomCode: Returns null', () => {
    expect(game.getRoomCode()).toBeNull();
});

test('getRoomCode: Returns room code', () => {
    game.roomCode = roomCode
    expect(game.getRoomCode()).toBe(roomCode);
});

// getGameByRoomCode
test('getGameByRoomCode: Returns null', () => {
    expect(game.getGameByRoomCode(roomCode)).toBeNull();
});

test('getGameByRoomCode: Returns game', () => {
    Game.activeGames[roomCode] = game;
    expect(game.getGameByRoomCode(roomCode)).toBe(game);
});

// register
test('register: Adds game to active games', () => {
    const roomCode = game.register();
    expect(Game.activeGames[roomCode]).toBe(game);
});

test('register: Updates room code', () => {
    const roomCode = game.register();
    expect(game.roomCode).not.toBeNull();
    expect(game.roomCode).toBe(roomCode);
});

test('register: Does not update room code if already registerd', () => {
    const roomCode = game.register();
    game.register();
    expect(Game.activeGames[roomCode]).toBe(game);
    expect(game.roomCode).toBe(roomCode);
});

// deregister
test('deregister: Removes game from active games', () => {
    Game.activeGames[roomCode] = game;
    game.roomCode = roomCode;
    game.isRegistered = true;
    game.deregister();
    expect(Game.activeGames).not.toHaveProperty(roomCode);
});

test('deregister: Resets room code', () => {
    Game.activeGames[roomCode] = game;
    game.roomCode = roomCode;
    game.isRegistered = true;
    game.deregister();
    expect(game.roomCode).toBeNull();
});

// getIsRegistered
test('getIsRegistered: returns false', () => {
    expect(game.getIsRegistered()).toBeFalsy();
});

test('getIsRegistered: returns true once registered', () => {
    game.register();
    expect(game.getIsRegistered()).toBeTruthy();
});

test('getIsRegistered: returns false once deregistered', () => {
    Game.activeGames[roomCode] = game;
    game.roomCode = roomCode;
    game.isRegistered = true;
    game.deregister();
    expect(game.getIsRegistered()).toBeFalsy();
});

// close
test('close: deregisters game', () => {
    Game.activeGames[roomCode] = game;
    game.roomCode = roomCode;
    game.isRegistered = true;
    game.close();
    expect(Game.activeGames).not.toHaveProperty(roomCode);
});

test('close: closes players', () => {
    game.players = [ mockPlayer, mockPlayer2, mockPlayer3 ];
    game.close();
    expect(mockPlayer.close).toBeCalled();
    expect(mockPlayer2.close).toBeCalled();
    expect(mockPlayer3.close).toBeCalled();
});

test('close: marks game as closed', () => {
    game.close();
    expect(game.isClosed).toBeTruthy();
});
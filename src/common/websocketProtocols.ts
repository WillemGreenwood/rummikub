/**
 * Stores a string example and a regex for matching protocols
 */
class Protocol {
    constructor(string: string, regex: RegExp) {
        this.string = string;
        this.regex = regex;
    }

    string: string;
    regex: RegExp;

    matches(str: string): boolean {
        return this.regex.test(str);
    }
}

/*
 * Open socket requests
 */
export const CREATE_GAME_PROTOCOL = new Protocol('rummikub-create', /^rummikub-create$/);
export const JOIN_GAME_PROTOCOL = new Protocol('rummikub-join-aaaaaa' /* aaaaaa replaced with room code */, /^rummikub-join-[a-z]{6}$/);
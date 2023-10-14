import { GameType } from "entities/game/@x/user";

export enum GameResult {
    defeat = "Поражение",
    wictory = "Победа",
}

export interface GameInfo {
    timestamp: number;
    result: GameResult;
    gameType: GameType;
}

export interface UserModel {
    name: null | string;
    winsCount: number;
    defeatCount: number;
    gameStories: GameInfo[];
}

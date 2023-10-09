enum GameResult {
    defeat = "defeat",
    wictory = "wictory",
}

export interface GameInfo {
    date: Date;
    result: GameResult;
}

export interface UserModel {
    name: null | string;
    winsCount: number;
    defeatCount: number;
    gamesStory: GameInfo[];
}

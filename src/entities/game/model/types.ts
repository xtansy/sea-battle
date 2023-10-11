export enum CellStatus {
    empty = "empty",
    damaged_empty = "damaged_empty",

    with_ship = "with_ship",
    damaged_with_ship = "damaged_with_ship",
}

export interface ICell {
    status: CellStatus;
    x: number;
    y: number;
}

export interface BoardData {
    board: ICell[][];
    destroyed: number;
}

export enum GameType {
    before_the_miss = "before_the_miss",
    in_turn = "in_turn",
}

export enum GameStatus {
    preparation = "preparation",
    in_the_game = "in_the_game",
}

export interface GameModel {
    gameType: null | GameType;
    gameStatus: GameStatus;
    canShoot: boolean;
    myBoardData: BoardData;
    enemyBoardData: BoardData;
}

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
    before_the_miss = "До промаха",
    in_turn = "По очереди",
}

export enum GameStatus {
    preparation = "Подготовка",
    in_the_game = "В игре",
    victory = "Победа!",
    defeat = "Поражение",
}

export interface GameModel {
    gameType: null | GameType;
    gameStatus: GameStatus;
    canShoot: boolean;
    myBoardData: BoardData;
    enemyBoardData: BoardData;
}

import { type ICell, CellStatus } from "../../model/types";

export const emptyFilledBoard = (board: ICell[][]) => {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            board[i][j] = { status: CellStatus.empty, x: i, y: j };
        }
    }
};

import { CellStatus, type ICell } from "..";

export const clearBoard = (board: ICell[][]) => {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            if (board[i][j].status === CellStatus.damaged_with_ship) {
                board[i][j].status = CellStatus.with_ship;
            }
            if (board[i][j].status === CellStatus.damaged_empty) {
                board[i][j].status = CellStatus.empty;
            }
        }
    }
};

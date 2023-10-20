import { type ICell, type ShootData, CellStatus } from "./types";

export const checkIsOneCellShip = ({ x, y }: ShootData, board: ICell[][]) => {
    const numRows = board.length;
    const numCols = board[0].length;

    const directions = [
        [0, -1],
        [0, 1],
        [-1, 0],
        [1, 0],
        [-1, -1],
        [1, 1],
    ];

    for (const [dx, dy] of directions) {
        const newX = x + dx;
        const newY = y + dy;

        // Проверяем, что новые координаты находятся в пределах массива
        if (newX >= 0 && newX < numRows && newY >= 0 && newY < numCols) {
            const cell = board[newX][newY];
            if (
                cell.status === CellStatus.damaged_with_ship ||
                cell.status === CellStatus.with_ship
            ) {
                return false;
            }
        }
    }
    return true;
};

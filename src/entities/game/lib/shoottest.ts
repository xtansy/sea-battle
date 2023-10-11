import { type ICell, CellStatus } from "..";
import { type ShootData } from "./types";

export const checkIsOneCellShip = ({ x, y }: ShootData, board: ICell[][]) => {
    const adjacent = [
        board[x - 1][y],
        board[x + 1][y],
        board[x][y - 1],
        board[x][y + 1],
    ];
    return !adjacent.find(
        (item) =>
            item.status === CellStatus.with_ship ||
            item.status === CellStatus.damaged_with_ship
    );
};

export const checkIsHorizontalShip = (
    { x, y }: ShootData,
    board: ICell[][]
) => {
    const adjacentHorizontal = [board[x][y - 1], board[x][y + 1]];
    return !!adjacentHorizontal.find(
        (item) =>
            item.status === CellStatus.with_ship ||
            item.status === CellStatus.damaged_with_ship
    );
};

export const checkIsShipDestroyed = ({ x, y }: ShootData, board: ICell[][]) => {
    const isHorizontalShip = checkIsHorizontalShip({ x, y }, board);

    if (isHorizontalShip) {
        for (
            let i = y;
            i < board[x].length && board[x][i].status !== CellStatus.empty;
            i++
        ) {
            const currentCell = board[x][i];
            if (currentCell.status === CellStatus.with_ship) {
                return false;
            }
        }
        for (
            let i = y;
            i >= 0 && board[x][i].status !== CellStatus.empty;
            i--
        ) {
            const currentCell = board[x][i];
            if (currentCell.status === CellStatus.with_ship) {
                return false;
            }
        }
        return true;
    }

    // Vertical ship
    for (
        let i = x;
        i < board[x].length && board[i][y].status !== CellStatus.empty;
        i++
    ) {
        const currentCell = board[i][y];
        if (currentCell.status === CellStatus.with_ship) {
            return false;
        }
    }
    for (let i = x; i >= 0 && board[i][y].status !== CellStatus.empty; i--) {
        const currentCell = board[i][y];
        if (currentCell.status === CellStatus.with_ship) {
            return false;
        }
    }

    return true;
};

export const shoot = ({ x, y }: ShootData, board: ICell[][]) => {
    const cell = board[x][y];

    if (cell.status === CellStatus.empty) {
        cell.status = CellStatus.damaged_empty;
        return;
    }

    if (cell.status === CellStatus.with_ship) {
        cell.status = CellStatus.damaged_with_ship;
    }
};

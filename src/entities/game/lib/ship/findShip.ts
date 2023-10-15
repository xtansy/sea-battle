import { type ShootData, type ICell, type ShipCoords } from "./types";

import {
    checkIsOneCellShip,
    checkIsHorizontalShip,
    checkIsCellHasShip,
} from "./";

export const findShip = ({ x, y }: ShootData, board: ICell[][]): ShipCoords => {
    const isOneCellShip = checkIsOneCellShip({ x, y }, board);
    if (isOneCellShip) {
        return { x, y, type: "oneCell" };
    }

    const isHorizontalShip = checkIsHorizontalShip({ x, y }, board);
    if (isHorizontalShip) {
        let startY = y;
        for (let i = y; i >= 1 && checkIsCellHasShip(board[x][i - 1]); i--) {
            startY--;
        }

        let endY = y;
        for (
            let i = y;
            i < board[x].length - 1 && checkIsCellHasShip(board[x][i + 1]);
            i++
        ) {
            endY++;
        }
        return {
            type: "horizontal",
            startY,
            endY,
            x,
        };
    }

    // vertical ship
    let startX = x;
    for (
        let i = x;
        i >= 0 && board[i - 1] && checkIsCellHasShip(board[i - 1][y]);
        i--
    ) {
        startX--;
    }

    let endX = x;
    for (
        let i = x;
        i < board[i].length &&
        board[i + 1] &&
        checkIsCellHasShip(board[i + 1][y]);
        i++
    ) {
        endX++;
    }

    return {
        type: "vertical",
        startX,
        endX,
        y,
    };
};

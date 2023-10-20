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
        let startX = x;
        for (let i = x; i >= 1 && checkIsCellHasShip(board[y][i - 1]); i--) {
            startX--;
        }

        let endX = x;
        for (
            let i = x;
            i < board[x].length - 1 && checkIsCellHasShip(board[y][i + 1]);
            i++
        ) {
            endX++;
        }
        return {
            type: "horizontal",
            startX,
            endX,
            y,
        };
    }

    // vertical ship
    let startY = y;
    for (
        let i = y;
        i >= 0 && board[i - 1] && checkIsCellHasShip(board[i - 1][x]);
        i--
    ) {
        startY--;
    }

    let endY = y;
    for (
        let i = y;
        i < board[i].length &&
        board[i + 1] &&
        checkIsCellHasShip(board[i + 1][x]);
        i++
    ) {
        endY++;
    }

    return {
        type: "vertical",
        startY,
        endY,
        x,
    };
};

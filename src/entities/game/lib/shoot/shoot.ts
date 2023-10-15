import { CellStatus, type BoardData } from "../../model/types";
import { type ShootData, type ShootResult } from "./types";

import { checkIsShipDestroyed, markAroundShip, findShip } from "../ship";

export const shootCell = (
    { x, y }: ShootData,
    boardData: BoardData
): ShootResult => {
    const board = boardData.board;
    const cell = board[x][y];

    if (cell.status === CellStatus.empty) {
        cell.status = CellStatus.damaged_empty;
        return false;
    }

    if (cell.status === CellStatus.with_ship) {
        cell.status = CellStatus.damaged_with_ship;
        const ship = findShip({ x, y }, board);

        // console.log(ship);

        if (checkIsShipDestroyed(ship, board)) {
            boardData.destroyed++;
            markAroundShip(ship, board);
            return { destroyed: true };
        }
        return { destroyed: false };
    }
    return false;
};

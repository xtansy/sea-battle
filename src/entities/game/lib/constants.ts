import { type ICell, CellStatus } from "../model/types";
import { ShipLength } from ".";

export const MAX_SHIPS = 10;
export const BOARD_SIZE = 10;
export const SHIP_SIZES: ShipLength[] = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];

export const EMPTY_BOARD: ICell[][] = new Array(BOARD_SIZE)
    .fill(null)
    .map((_, rowIndex) =>
        new Array(BOARD_SIZE).fill(null).map((_, colIndex) => ({
            status: CellStatus.empty,
            x: colIndex,
            y: rowIndex,
        }))
    );

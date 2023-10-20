import { type ICell, type ShipCoords, CellStatus } from "./types";

export const checkIsShipDestroyed = (ship: ShipCoords, board: ICell[][]) => {
    switch (ship.type) {
        case "oneCell":
            return true;
        case "horizontal":
            for (let i = ship.startX; i <= ship.endX; i++) {
                if (board[ship.y][i].status !== CellStatus.damaged_with_ship)
                    return false;
            }
            return true;
        case "vertical":
            for (let i = ship.startY; i <= ship.endY; i++) {
                if (board[i][ship.x].status !== CellStatus.damaged_with_ship)
                    return false;
            }
            return true;
    }
};

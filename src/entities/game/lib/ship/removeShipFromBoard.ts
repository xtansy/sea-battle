import { CellStatus, ICell, findShip } from ".";

export const removeShipFromBoard = (x: number, y: number, board: ICell[][]) => {
    if (board[x][y].status === CellStatus.empty) return;

    const ship = findShip({ x, y }, board);

    if (ship.type === "horizontal") {
        for (let i = ship.startY; i <= ship.endY; i++) {
            board[ship.x][i].status = CellStatus.empty;
        }
    } else if (ship.type === "vertical") {
        for (let i = ship.startX; i <= ship.endX; i++) {
            board[ship.y][i].status = CellStatus.empty;
        }
    } else {
        board[ship.x][ship.y].status = CellStatus.empty;
    }
};
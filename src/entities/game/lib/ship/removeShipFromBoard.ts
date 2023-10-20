import { CellStatus, ICell, findShip } from ".";

export const removeShipFromBoard = (x: number, y: number, board: ICell[][]) => {
    if (board[y][x].status === CellStatus.empty) return;

    const ship = findShip({ x, y }, board);

    if (ship.type === "horizontal") {
        for (let i = ship.startX; i <= ship.endX; i++) {
            board[ship.y][i].status = CellStatus.empty;
        }
    } else if (ship.type === "vertical") {
        for (let i = ship.startY; i <= ship.endY; i++) {
            board[i][ship.x].status = CellStatus.empty;
        }
    } else {
        board[ship.y][ship.x].status = CellStatus.empty;
    }
};

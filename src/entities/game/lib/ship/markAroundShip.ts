import { type ICell, type ShipCoords, CellStatus } from "./types";

const markAroundCell = (x: number, y: number, board: ICell[][]) => {
    const numRows = board.length;
    const numCols = board[0].length;

    const directions = [
        [0, -1],
        [0, 1],
        [-1, 0],
        [1, 0],
        [-1, -1],
        [-1, 1],
        [1, -1],
        [1, 1],
    ];

    for (const [dx, dy] of directions) {
        const newX = x + dx;
        const newY = y + dy;

        // Проверяем, что новые координаты находятся в пределах массива
        if (newX >= 0 && newX < numRows && newY >= 0 && newY < numCols) {
            const cell = board[newY][newX];
            if (cell.status === CellStatus.empty) {
                cell.status = CellStatus.damaged_empty;
            }
        }
    }
};

export const markAroundShip = (ship: ShipCoords, board: ICell[][]) => {
    switch (ship.type) {
        case "oneCell":
            markAroundCell(ship.x, ship.y, board); // можно сюда передавать directions
            break;
        case "horizontal":
            for (let i = ship.startX; i <= ship.endX; i++) {
                markAroundCell(i, ship.y, board);
            }
            break;
        case "vertical":
            for (let i = ship.startY; i <= ship.endY; i++) {
                markAroundCell(ship.x, i, board);
            }
            break;
    }
};

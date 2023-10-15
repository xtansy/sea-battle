import { type ICell, type ShipCoords, CellStatus } from "./types";

const markAroundCell = (x: number, y: number, board: ICell[][]) => {
    const numRows = board.length;
    const numCols = board[0].length;

    // Проверяем соседей по верхнему, нижнему, левому и правому направлениям
    const directions = [
        [0, -1], // Верхний
        [0, 1], // Нижний
        [-1, 0], // Левый
        [1, 0], // Правый
        [-1, -1], // Диагональ вверх-налево
        [-1, 1], // Диагональ вверх-направо
        [1, -1], // Диагональ вниз-налево
        [1, 1], // Диагональ вниз-направо
    ];

    for (const [dx, dy] of directions) {
        const newX = x + dx;
        const newY = y + dy;

        // Проверяем, что новые координаты находятся в пределах массива
        if (newX >= 0 && newX < numRows && newY >= 0 && newY < numCols) {
            const cell = board[newX][newY];
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
            for (let i = ship.startY; i <= ship.endY; i++) {
                markAroundCell(ship.x, i, board);
            }
            break;
        case "vertical":
            for (let i = ship.startX; i <= ship.endX; i++) {
                markAroundCell(i, ship.y, board);
            }
            break;
    }
};

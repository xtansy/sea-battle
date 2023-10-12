import { type ICell, CellStatus, type BoardData } from "..";
import { type ShootData, type Ship } from "./types";

export const checkIsOneCellShip = ({ x, y }: ShootData, board: ICell[][]) => {
    const numRows = board.length;
    const numCols = board[0].length;

    const directions = [
        [0, -1], // Верхний
        [0, 1], // Нижний
        [-1, 0], // Левый
        [1, 0], // Правый
    ];

    for (const [dx, dy] of directions) {
        const newX = x + dx;
        const newY = y + dy;

        // Проверяем, что новые координаты находятся в пределах массива
        if (newX >= 0 && newX < numRows && newY >= 0 && newY < numCols) {
            const cell = board[newX][newY];
            if (
                cell.status === CellStatus.damaged_with_ship ||
                cell.status === CellStatus.with_ship
            ) {
                return false;
            }
        }
    }
    return true;
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

const checkIsCellHasShip = (cell: ICell) => {
    return (
        cell.status === CellStatus.damaged_with_ship ||
        cell.status === CellStatus.with_ship
    );
};

export const findShip = ({ x, y }: ShootData, board: ICell[][]): Ship => {
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
    for (let i = x; i >= 0 && checkIsCellHasShip(board[i - 1][y]); i--) {
        startX--;
    }

    let endX = x;
    for (
        let i = x;
        i < board[i].length && checkIsCellHasShip(board[i + 1][y]);
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

export const checkIsShipDestroyed = (ship: Ship, board: ICell[][]) => {
    switch (ship.type) {
        case "oneCell":
            return true;
        case "horizontal":
            for (let i = ship.startY; i <= ship.endY; i++) {
                if (board[ship.x][i].status !== CellStatus.damaged_with_ship)
                    return false;
            }
            return true;
        case "vertical":
            for (let i = ship.startX; i <= ship.endX; i++) {
                if (board[i][ship.y].status !== CellStatus.damaged_with_ship)
                    return false;
            }
            return true;
    }
};

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

export const markAdjacentCells = (ship: Ship, board: ICell[][]) => {
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
            for (let i = ship.startX; i < ship.endX; i++) {
                markAroundCell(i, ship.y, board);
            }
            break;
    }
};

export const shootCell = ({ x, y }: ShootData, boardData: BoardData) => {
    const board = boardData.board;
    const cell = board[x][y];

    if (cell.status === CellStatus.empty) {
        cell.status = CellStatus.damaged_empty;
        return;
    }

    if (cell.status === CellStatus.with_ship) {
        cell.status = CellStatus.damaged_with_ship;

        const ship = findShip({ x, y }, board);

        console.log(ship);

        if (checkIsShipDestroyed(ship, board)) {
            markAdjacentCells(ship, board);
            boardData.destroyed++;
        }
    }
};

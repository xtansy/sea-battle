import { ICell, CellStatus, checkIsOneCellShip } from ".";

export enum ShipType {
    OneDeck = 1,
    TwoDeck = 2,
    ThreeDeck = 3,
    FourDeck = 4,
}

export const countShipsOnBoard = (board: ICell[][], shipType: ShipType) => {
    let count = 0;
    const visited = Array.from({ length: board.length }, () =>
        Array(board[0].length).fill(false)
    );

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j].status === CellStatus.with_ship && !visited[i][j]) {
                const shipSize = findShipSize({ x: i, y: j }, board, visited);
                if (shipSize === shipType) {
                    count++;
                }
            }
        }
    }

    return count;
};

function findShipSize(
    start: { x: number; y: number },
    board: ICell[][],
    visited: boolean[][]
) {
    const queue = [start];
    let shipSize = 0;

    while (queue.length > 0) {
        const current = queue.pop();

        if (
            current &&
            board[current.x][current.y].status === CellStatus.with_ship &&
            !visited[current.x][current.y]
        ) {
            visited[current.x][current.y] = true;
            shipSize++;

            // Добавляем соседние клетки в очередь для проверки
            if (current.x > 0) queue.push({ x: current.x - 1, y: current.y });
            if (current.x < board.length - 1)
                queue.push({ x: current.x + 1, y: current.y });
            if (current.y > 0) queue.push({ x: current.x, y: current.y - 1 });
            if (current.y < board[0].length - 1)
                queue.push({ x: current.x, y: current.y + 1 });
        }
    }

    return shipSize;
}

function getMaximumShipsCount(shipType: ShipType) {
    switch (shipType) {
        case ShipType.OneDeck:
            return 4;
        case ShipType.TwoDeck:
            return 3;
        case ShipType.ThreeDeck:
            return 2;
        case ShipType.FourDeck:
            return 1;
        default:
            return 0;
    }
}

function isShipPlacementValid(
    board: ICell[][],
    startX: number,
    startY: number,
    endX: number,
    endY: number
) {
    const checkAdjacentCell = (x: number, y: number) => {
        if (x >= 0 && x < board[0].length && y >= 0 && y < board.length) {
            return board[y][x].status === CellStatus.with_ship;
        }
        return false;
    };

    const offsets = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1], // Горизонтальные и вертикальные соседи
        [-1, -1],
        [1, -1],
        [-1, 1],
        [1, 1], // Диагональные соседи
    ];

    for (let i = Math.min(startX, endX); i <= Math.max(startX, endX); i++) {
        for (let j = Math.min(startY, endY); j <= Math.max(startY, endY); j++) {
            if (board[j][i].status === CellStatus.with_ship) {
                return false;
            }

            for (const [offsetX, offsetY] of offsets) {
                if (checkAdjacentCell(i + offsetX, j + offsetY)) {
                    return false;
                }
            }
        }
    }

    return true;
}

export const addShipToBoard = (
    board: ICell[][],
    shipType: ShipType,
    startX: number,
    startY: number,
    endX: number,
    endY: number
) => {
    if (!checkIsOneCellShip({ x: startX, y: startY }, board)) {
        return false;
    }

    if (!(startX === endX || startY === endY)) {
        return false;
    }

    if (
        shipType !== 1 &&
        !(
            Math.abs(endX - startX) + 1 === shipType ||
            Math.abs(endY - startY) + 1 === shipType
        )
    ) {
        return false;
    }

    // Проверяем, что расстояние между кораблями минимум одна клетка
    const valid = isShipPlacementValid(board, startX, startY, endX, endY);

    if (!valid) return false;

    // Проверяем, что на доске есть доступное место для корабля заданного типа
    if (countShipsOnBoard(board, shipType) >= getMaximumShipsCount(shipType)) {
        return false;
    }

    // Размещаем корабль на доске
    for (let i = Math.min(startY, endY); i <= Math.max(startY, endY); i++) {
        for (let j = Math.min(startX, endX); j <= Math.max(startX, endX); j++) {
            board[i][j].status = CellStatus.with_ship;
        }
    }

    return true;
};

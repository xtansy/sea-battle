import { ICell, CellStatus, checkIsOneCellShip } from ".";

export enum ShipType {
    OneDeck = 1,
    TwoDeck = 2,
    ThreeDeck = 3,
    FourDeck = 4,
}
export const countShipsOnBoard2 = (board: ICell[][], shipType: ShipType) => {
    let count = 0;

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j].status === CellStatus.with_ship) {
                if (isShipOfGivenType(board, shipType, i, j)) {
                    count++;
                }
            }
        }
    }

    return count;
};

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

function isShipOfGivenType(
    board: ICell[][],
    shipType: ShipType,
    x: number,
    y: number
) {
    let length = 0;

    // Проверяем, что корабль размещается только горизонтально или вертикально
    if (x + shipType <= board.length) {
        for (let i = x; i < x + shipType; i++) {
            if (board[i][y].status === CellStatus.with_ship) {
                length++;
            } else {
                break;
            }
        }
    } else if (y + shipType <= board[0].length) {
        for (let j = y; j < y + shipType; j++) {
            if (board[x][j].status === CellStatus.with_ship) {
                length++;
            } else {
                break;
            }
        }
    }

    return length === shipType;
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

export const addShipToBoard = (
    board: ICell[][],
    shipType: ShipType,
    startX: number,
    startY: number,
    endX: number,
    endY: number
) => {
    if (!checkIsOneCellShip({ x: startX, y: startY }, board)) {
        console.log("return 1");
        return false;
    }

    const isHorizontal = startX === endX;

    if (isHorizontal) {
        if (endY - startY + 1 !== shipType) {
            console.log("return 3");
            return false;
        }
    } else {
        if (endX - startX + 1 !== shipType) {
            console.log("return 4");
            return false;
        }
    }

    if (shipType === 1) {
        if (!checkIsOneCellShip({ x: startX, y: startY }, board)) {
            return false;
        }
    }

    if (
        shipType !== 1 &&
        !(endX - startX + 1 <= shipType || endY - startY + 1 <= shipType)
    ) {
        return false;
    }

    // Проверяем, что расстояние между кораблями минимум одна клетка
    for (let i = Math.min(startX, endX); i <= Math.max(startX, endX); i++) {
        for (let j = Math.min(startY, endY); j <= Math.max(startY, endY); j++) {
            if (i >= 0 && i < board.length && j >= 0 && j < board[0].length) {
                if (board[i][j].status === CellStatus.with_ship) {
                    return false;
                }
            }
        }
    }

    // Проверяем, что на доске есть доступное место для корабля заданного типа
    if (countShipsOnBoard(board, shipType) >= getMaximumShipsCount(shipType)) {
        return false;
    }

    // Размещаем корабль на доске
    for (let i = startX; i <= endX; i++) {
        for (let j = startY; j <= endY; j++) {
            board[i][j].status = CellStatus.with_ship;
        }
    }

    return true;
};

import { type ICell, CellStatus, type BoardData } from "..";
import { type ShootData, type Ship } from "./types";

export const checkIsOneCellShip = ({ x, y }: ShootData, board: ICell[][]) => {
    const adjacent = [
        board[x - 1][y],
        board[x + 1][y],
        board[x][y - 1],
        board[x][y + 1],
    ];
    return !adjacent.find(
        (item) =>
            item.status === CellStatus.with_ship ||
            item.status === CellStatus.damaged_with_ship
    );
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
        for (let i = y; i >= 0 && checkIsCellHasShip(board[x][i - 1]); i--) {
            startY--;
        }

        let endY = y;
        for (
            let i = y;
            i < board[x].length && checkIsCellHasShip(board[x][i + 1]);
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

export const markCell = (cell: ICell | undefined) => {
    if (cell && cell.status === CellStatus.empty) {
        cell.status = CellStatus.damaged_empty;
    }
};

export const markAdjacentCells = (ship: Ship, board: ICell[][]) => {
    if (ship.type === "oneCell") {
        if (ship.x - 1 >= 0) {
            markCell(board[ship.x - 1][ship.y]);
        }
        if (ship.x + 1 < board[ship.x].length) {
            markCell(board[ship.x + 1][ship.y]);
        }
        markCell(board[ship.x][ship.y - 1]);
        markCell(board[ship.x][ship.y + 1]);
        return;
    }

    if (ship.type === "horizontal") {
        markCell(board[ship.x][ship.startY - 1]);
        markCell(board[ship.x][ship.endY + 1]);
        for (let i = ship.startY; i <= ship.endY; i++) {
            markCell(board[ship.x - 1][i]);
            markCell(board[ship.x + 1][i]);
        }
        return;
    }
    if (ship.type === "vertical") {
        markCell(board[ship.y][ship.startX - 1]);
        markCell(board[ship.y][ship.endX + 1]);

        for (let i = ship.startX; i < ship.endX; i++) {
            markCell(board[i][ship.y - 1]);
            markCell(board[i][ship.y + 1]);
        }

        return;
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

import { ICell, CellStatus } from "../../model/types";
import { BOARD_SIZE, SHIP_SIZES } from "../constants";
import { generateRandomBoolean, generateRandomInt } from "../generators";

const offsets = [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: -1, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: -1 },
    { x: 1, y: 1 },
    { x: -1, y: -1 },
    { x: 1, y: -1 },
    { x: -1, y: 1 },
];

const isValidPlacement = (
    x: number,
    y: number,
    shipSize: number,
    isVertical: boolean,
    board: ICell[][]
) => {
    const checkSurrounding = (x: number, y: number) => {
        for (const offset of offsets) {
            const offsetX = x + offset.x;
            const offsetY = y + offset.y;

            if (
                offsetX >= 0 &&
                offsetX < BOARD_SIZE &&
                offsetY >= 0 &&
                offsetY < BOARD_SIZE &&
                board[offsetX][offsetY].status === CellStatus.with_ship
            ) {
                return false;
            }
        }

        return true;
    };

    for (let i = 0; i < shipSize; i++) {
        const currentX = isVertical ? x + i : x;
        const currentY = isVertical ? y : y + i;

        if (
            currentX < 0 ||
            currentX >= BOARD_SIZE ||
            currentY < 0 ||
            currentY >= BOARD_SIZE ||
            board[currentX][currentY].status === CellStatus.with_ship ||
            !checkSurrounding(currentX, currentY)
        ) {
            return false;
        }
    }

    return true;
};

const placeShipOnBoard = (shipSize: number, board: ICell[][]) => {
    let placed = false;
    let attempts = 0;

    while (!placed) {
        const x = generateRandomInt(0, BOARD_SIZE - 1);
        const y = generateRandomInt(0, BOARD_SIZE - 1);
        const isVertical = generateRandomBoolean();

        if (isValidPlacement(x, y, shipSize, isVertical, board)) {
            if (isVertical) {
                for (let i = 0; i < shipSize; i++) {
                    board[x + i][y].status = CellStatus.with_ship;
                }
            } else {
                for (let i = 0; i < shipSize; i++) {
                    board[x][y + i].status = CellStatus.with_ship;
                }
            }
            placed = true;
        }

        attempts++;

        if (attempts >= BOARD_SIZE * BOARD_SIZE) {
            // Если попробовали разместить на всей доске и не удалось, выходим
            break;
        }
    }
};

export const randomPlaceShip = (board: ICell[][]) => {
    SHIP_SIZES.forEach((size) => placeShipOnBoard(size, board));
};

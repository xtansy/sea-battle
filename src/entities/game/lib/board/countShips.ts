import { type ICell } from "../../model/types";

import { checkIsCellHasShip } from "../ship";
import { SHIP_SIZES } from "..";

export const countShips = (board: ICell[][]): number => {
    const MUTABLE_SHIP_SIZES = [...SHIP_SIZES];

    let shipCount = 0;

    for (let x = 0; x < board.length; x++) {
        for (let y = 0; y < board[x].length; y++) {
            if (checkIsCellHasShip(board[x][y])) {
                // Проверяем, что это начало корабля
                if (
                    (x === 0 || !checkIsCellHasShip(board[x - 1][y])) &&
                    (y === 0 || !checkIsCellHasShip(board[x][y - 1]))
                ) {
                    // Начало корабля найдено
                    let size = 1;

                    // Проверяем горизонтальную часть корабля
                    for (
                        let i = x + 1;
                        i < board.length && checkIsCellHasShip(board[i][y]);
                        i++
                    ) {
                        size++;
                    }

                    // Проверяем вертикальную часть корабля
                    for (
                        let j = y + 1;
                        j < board[x].length && checkIsCellHasShip(board[x][j]);
                        j++
                    ) {
                        size++;
                    }

                    // Если размер корабля соответствует одному из известных размеров кораблей,
                    // уменьшаем соответствующий счетчик
                    const index = MUTABLE_SHIP_SIZES.indexOf(size);
                    if (index !== -1) {
                        MUTABLE_SHIP_SIZES.splice(index, 1);
                        shipCount++;
                    }
                }
            }
        }
    }

    return shipCount;
};

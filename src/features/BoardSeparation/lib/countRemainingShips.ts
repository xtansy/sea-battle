import { type ICell, CellStatus } from "entities/game";

type RemainingShips = {
    deck1: number;
    deck2: number;
    deck3: number;
    deck4: number;
};

const getShipLength = (
    board: ICell[][],
    x: number,
    y: number,
    visited: boolean[][]
): number => {
    const stack = [{ x, y }];
    let length = 0;

    while (stack.length > 0) {
        const item = stack.pop();
        if (!item) break;
        const { x, y } = item;
        if (
            x >= 0 &&
            x < board[0].length &&
            y >= 0 &&
            y < board.length &&
            board[y][x].status === CellStatus.with_ship &&
            !visited[y][x]
        ) {
            visited[y][x] = true;
            length++;

            // Добавляем соседние клетки в стек для дальнейшей проверки.
            stack.push({ x: x + 1, y });
            stack.push({ x: x - 1, y });
            stack.push({ x, y: y + 1 });
            stack.push({ x, y: y - 1 });
        }
    }

    return length;
};

export const countRemainingShips = (board: ICell[][]): RemainingShips => {
    const remainingShips: RemainingShips = {
        deck1: 4,
        deck2: 3,
        deck3: 2,
        deck4: 1,
    };

    const visited: boolean[][] = Array(board.length)
        .fill(0)
        .map(() => Array(board[0].length).fill(false));

    for (let y = 0; y < board.length; y++) {
        for (let x = 0; x < board[0].length; x++) {
            if (board[y][x].status === CellStatus.with_ship && !visited[y][x]) {
                const shipLength = getShipLength(board, x, y, visited);

                // Уменьшаем количество оставшихся кораблей соответствующего типа.
                switch (shipLength) {
                    case 1:
                        remainingShips.deck1--;
                        break;
                    case 2:
                        remainingShips.deck2--;
                        break;
                    case 3:
                        remainingShips.deck3--;
                        break;
                    case 4:
                        remainingShips.deck4--;
                        break;
                }
            }
        }
    }

    return remainingShips;
};

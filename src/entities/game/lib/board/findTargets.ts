import { CellStatus, ICell } from "..";

export type Target = { x: number; y: number };

export const findTargets = (board: ICell[][]): Target[] => {
    const targets: Target[] = [];

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            const cell = board[i][j];
            if (cell.status === CellStatus.with_ship) {
                targets.push({ x: cell.x, y: cell.y });
            }
        }
    }

    return targets;
};

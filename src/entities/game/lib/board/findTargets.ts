import { type ShootData, type ICell, CellStatus } from "..";

export const findTargets = (
    board: ICell[][],
    cb: (cellStatus: CellStatus) => boolean
): ShootData[] => {
    const targets: ShootData[] = [];

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[0].length; j++) {
            const cell = board[i][j];
            if (cb(cell.status)) {
                targets.push({ x: cell.x, y: cell.y });
            }
        }
    }

    return targets;
};

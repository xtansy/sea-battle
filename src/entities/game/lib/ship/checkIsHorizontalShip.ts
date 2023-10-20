import { type ICell, type ShootData, CellStatus } from "./types";

export const checkIsHorizontalShip = (
    { x, y }: ShootData,
    board: ICell[][]
) => {
    const adjacentHorizontal = [board[y][x - 1], board[y][x + 1]];
    return !!adjacentHorizontal.find(
        (item) =>
            item && // Check that the element exists
            (item.status === CellStatus.with_ship ||
                item.status === CellStatus.damaged_with_ship)
    );
};

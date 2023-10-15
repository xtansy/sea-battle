import { type ICell, CellStatus } from "./types";

export const checkIsCellHasShip = (cell: ICell | undefined) => {
    return (
        cell && // Check that the element exists
        (cell.status === CellStatus.damaged_with_ship ||
            cell.status === CellStatus.with_ship)
    );
};

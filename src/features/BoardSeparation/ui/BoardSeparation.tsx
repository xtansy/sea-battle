import css from "./BoardSeparation.module.css";

import { useState } from "react";

import { useAppDispatch } from "shared/lib";
import { Ship } from "entities/game";
import { countRemainingShips } from "../lib/countRemainingShips";

import {
    Board,
    type ICell,
    Cell,
    addShip,
    CellStatus,
    removeShip,
} from "entities/game";

interface BoardSeparationProps {
    board: ICell[][];
}

interface ShipStartCoords {
    startX: number;
    startY: number;
}

export const BoardSeparation: React.FC<BoardSeparationProps> = ({ board }) => {
    const shipsRemains = countRemainingShips(board);

    const dispatch = useAppDispatch();

    const [start, setStart] = useState<null | ShipStartCoords>(null);

    const onClick = (cell: ICell) => {
        if (cell.status === CellStatus.with_ship) {
            dispatch(removeShip({ x: cell.x, y: cell.y }));
            return;
        }

        if (!start) {
            setStart({ startX: cell.x, startY: cell.y });
            return;
        }

        const isHorizontal = cell.y === start.startY;

        const len = isHorizontal
            ? Math.abs(cell.x - start.startX)
            : Math.abs(cell.y - start.startY);

        dispatch(
            addShip({
                shipType: len + 1,
                startX: start.startX,
                startY: start.startY,
                endX: cell.x,
                endY: cell.y,
            })
        );

        setStart(null);
    };

    const renderCell = (cell: ICell) => {
        const clazz =
            start?.startX === cell.x && start.startY === cell.y
                ? "sep"
                : undefined;

        return (
            <Cell className={clazz} cell={cell} onClick={() => onClick(cell)} />
        );
    };

    const renderShipInfo = (count: number, shipLen: number) => {
        if (count > 0) {
            return (
                <div className={css.shipInfo}>
                    <p className={css.count}>{count}</p>
                    <Ship shipLen={shipLen} />
                </div>
            );
        } else {
            return null;
        }
    };

    return (
        <div>
            <Board board={board} renderCell={renderCell} />
            <div className={css.ships}>
                {renderShipInfo(shipsRemains.deck1, 1)}
                {renderShipInfo(shipsRemains.deck2, 2)}
                {renderShipInfo(shipsRemains.deck3, 3)}
                {renderShipInfo(shipsRemains.deck4, 4)}
            </div>
        </div>
    );
};

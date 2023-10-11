import css from "./Game.module.css";

import { Board } from "..";
import { BoardData, ICell } from "entities/game";

interface GameProps {
    renderCell: (cell: ICell) => React.ReactNode;
    myBoardData: BoardData;
    enemyBoardData: BoardData;
    bottomSlot?: React.ReactNode;
}

export const Game: React.FC<GameProps> = ({
    myBoardData,
    enemyBoardData,
    renderCell,
    bottomSlot,
}) => {
    return (
        <div className={css.game}>
            <div className={css.boards}>
                <Board board={myBoardData.board} />
                <Board board={enemyBoardData.board} renderCell={renderCell} />
            </div>
            <div className={css.bottomSlot}>{bottomSlot && bottomSlot}</div>
        </div>
    );
};

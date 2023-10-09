import css from "./Game.module.css";

import { Board } from "..";
import { BoardData, ICell } from "entities/game";

interface GameProps {
    renderCell: (cell: ICell) => React.ReactNode;
    myBoardData: BoardData;
    enemyBoardData: BoardData;
}

export const Game: React.FC<GameProps> = ({
    myBoardData,
    enemyBoardData,
    renderCell,
}) => {
    return (
        <div className={css.game}>
            <Board board={myBoardData.board} renderCell={renderCell} />
            <Board board={enemyBoardData.board} />
        </div>
    );
};

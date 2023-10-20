import css from "./Game.module.css";

import { useMemo } from "react";
import { useSelector } from "react-redux";

import {
    type BoardData,
    type ICell,
    Board,
    gameStatusSelector,
    canShootSelector,
    GameStatus,
} from "entities/game";

interface GameProps {
    myBoardData: BoardData;
    enemyBoardData: BoardData;
    bottomSlot?: React.ReactNode;
    renderCell: (cell: ICell) => React.ReactNode;
    renderMyBoard?: (board: ICell[][]) => React.ReactNode;
}

export const Game: React.FC<GameProps> = ({
    myBoardData,
    enemyBoardData,
    bottomSlot,
    renderCell,
    renderMyBoard,
}) => {
    const gameStatus = useSelector(gameStatusSelector);
    const canShoot = useSelector(canShootSelector);

    const MoveInfo = useMemo(() => {
        if (gameStatus !== GameStatus.in_the_game) return null;

        if (canShoot) {
            return <p className={css.shootInfo}>ваш ход</p>;
        }
        return <p className={css.robotShootInfo}>ход ИИ</p>;
    }, [gameStatus, canShoot]);

    /**
     * ✅ FSD Best practice
     *
     * Receive game actions (shoot)
     * to render-prop to avoid entity cross-import
     */

    return (
        <div className={css.game}>
            <div className={css.header}>
                <h2>Статус игры: {gameStatus.toLocaleLowerCase()}</h2>
                {MoveInfo}
            </div>
            <div className={css.boards}>
                {renderMyBoard ? (
                    renderMyBoard(myBoardData.board)
                ) : (
                    <Board board={myBoardData.board} />
                )}
                <Board board={enemyBoardData.board} renderCell={renderCell} />
            </div>
            <div className={css.bottomSlot}>{bottomSlot && bottomSlot}</div>
        </div>
    );
};

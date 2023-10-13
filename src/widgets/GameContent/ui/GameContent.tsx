import css from "./GameContent.module.css";

import { Game, ICell } from "entities/game";
import { CellShot } from "features/CellShot";
import { RestartGameButton } from "features/RestartGame";
import { StartGameButton } from "features/StartGame";
import { useSelector } from "react-redux";
import {
    myBoardDataSelector,
    enemyBoardDataSelector,
    gameStatusSelector,
    GameStatus,
} from "entities/game";

export const GameContent = () => {
    const myBoardData = useSelector(myBoardDataSelector);
    const enemyBoardData = useSelector(enemyBoardDataSelector);
    const gameStatus = useSelector(gameStatusSelector);

    const generateBottomSlot = () => {
        switch (gameStatus) {
            case GameStatus.preparation:
                return <StartGameButton />;
            case GameStatus.in_the_game:
                return <RestartGameButton />;
            default:
                return <button>Сыграть еще раз</button>;
        }
    };

    return (
        <div className={css.gameContent}>
            <Game
                myBoardData={myBoardData}
                enemyBoardData={enemyBoardData}
                bottomSlot={generateBottomSlot()}
                renderCell={(cell: ICell) => <CellShot cell={cell} />}
            />
        </div>
    );
};

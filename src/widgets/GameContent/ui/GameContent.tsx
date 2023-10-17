import css from "./GameContent.module.css";

import { useSelector } from "react-redux";
import { CellShot } from "features/CellShot";
import { RestartGameButton } from "features/RestartGame";
import { StartGameButton } from "features/StartGame";
import { RandomPlaceShipButton } from "features/RandomPlaceShip";
import { SetRobotMode } from "features/SetRobotMode";
import {
    myBoardDataSelector,
    enemyBoardDataSelector,
    gameStatusSelector,
    GameStatus,
    Game,
    type ICell,
} from "entities/game";
import { PutShip } from "features/PutShip";
import { RemoveShip } from "features/RemoveShip";
import { ToggleDevMode } from "features/ToggleDevMode";

export const GameContent = () => {
    const myBoardData = useSelector(myBoardDataSelector);
    const enemyBoardData = useSelector(enemyBoardDataSelector);
    const gameStatus = useSelector(gameStatusSelector);

    const generateBottomSlot = () => {
        if (gameStatus === GameStatus.in_the_game) {
            return (
                <div className={css.actions}>
                    <RestartGameButton />
                    <ToggleDevMode />
                </div>
            );
        }
        return (
            <>
                <SetRobotMode />
                <div className={css.buttons}>
                    <StartGameButton>Играть</StartGameButton>
                    <RandomPlaceShipButton />
                </div>
                <div className={css.shipActions}>
                    <PutShip />
                    <RemoveShip />
                </div>
            </>
        );
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

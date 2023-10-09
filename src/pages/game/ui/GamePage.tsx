import { useSelector } from "react-redux";
import { myBoardSelector } from "entities/game";
import { Board } from "entities/game/ui";
import { GameHeader } from "widgets/GameHeader";
import {
    defeatCountSelector,
    userNameSelector,
    winsCountSelector,
} from "entities/user";

export const GamePage = () => {
    const board = useSelector(myBoardSelector);
    const name = useSelector(userNameSelector);
    const winsCount = useSelector(winsCountSelector);
    const defeatCount = useSelector(defeatCountSelector);

    if (!name) {
        return null;
    }

    return (
        <div>
            <GameHeader
                myName={name}
                myWinsCount={winsCount}
                enemyName="ИИ"
                enemyWinsCount={defeatCount}
            />
            <Board board={board} />
        </div>
    );
};

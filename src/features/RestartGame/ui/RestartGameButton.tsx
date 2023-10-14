import { useDispatch, useSelector } from "react-redux";

import { Button } from "shared/ui";
import { restartGame } from "entities/game";
import { gameTypeSelector } from "entities/game";
import { lose } from "entities/user";

export const RestartGameButton = () => {
    const dispatch = useDispatch();
    const gameType = useSelector(gameTypeSelector);

    const onClick = () => {
        dispatch(restartGame());
        if (gameType) dispatch(lose(gameType));
    };

    return <Button onClick={onClick}>Начать сначала</Button>;
};

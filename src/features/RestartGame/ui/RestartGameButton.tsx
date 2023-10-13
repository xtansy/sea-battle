import { useDispatch } from "react-redux";

import { Button } from "shared/ui";
import { restartGame } from "entities/game";
import { lose } from "entities/user";

export const RestartGameButton = () => {
    const dispatch = useDispatch();

    const onClick = () => {
        dispatch(restartGame());
        dispatch(lose());
    };

    return <Button onClick={onClick}>Начать сначала</Button>;
};

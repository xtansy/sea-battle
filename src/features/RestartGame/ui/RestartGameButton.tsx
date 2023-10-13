import { useDispatch } from "react-redux";

import { Button } from "shared/ui";
import { restartGame } from "entities/game";

export const RestartGameButton = () => {
    const dispatch = useDispatch();

    const onClick = () => {
        dispatch(restartGame());
    };

    return <Button onClick={onClick}>Начать сначала</Button>;
};

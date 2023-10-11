import { useDispatch } from "react-redux";

import { Button } from "shared/ui";
import { startGame } from "entities/game";

export const StartGameButton = () => {
    const dispatch = useDispatch();

    const onClick = () => {
        dispatch(startGame());
    };

    return <Button onClick={onClick}>Играть</Button>;
};

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { GameStatus, gameStatusSelector } from "entities/game";
import { lose, win } from "entities/user";

export const useGameStories = () => {
    const dispatch = useDispatch();
    const gameStatus = useSelector(gameStatusSelector);

    useEffect(() => {
        if (gameStatus === GameStatus.victory) {
            dispatch(win());
        } else if (gameStatus === GameStatus.defeat) {
            dispatch(lose());
        }
    }, [gameStatus]);
};

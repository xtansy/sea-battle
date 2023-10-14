import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
    GameStatus,
    gameStatusSelector,
    gameTypeSelector,
} from "entities/game";
import { lose, win } from "entities/user";

export const useGameStories = () => {
    const dispatch = useDispatch();
    const gameStatus = useSelector(gameStatusSelector);
    const gameType = useSelector(gameTypeSelector);

    useEffect(() => {
        if (gameType) {
            if (gameStatus === GameStatus.victory) {
                dispatch(win(gameType));
            } else if (gameStatus === GameStatus.defeat) {
                dispatch(lose(gameType));
            }
        }
    }, [gameStatus]);
};

import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
    canShootSelector,
    gameStatusSelector,
    robotModeSelector,
    robotShoot,
    GameStatus,
    targetSelector,
    myEmptyCellsSelector,
} from "entities/game";
import { robotLogic } from "./robotLogic";

export const useRobot = () => {
    const dispatch = useDispatch();
    const canShoot = useSelector(canShootSelector);
    const robotMode = useSelector(robotModeSelector);
    const gameStatus = useSelector(gameStatusSelector);
    const emptyCells = useSelector(myEmptyCellsSelector);
    const targets = useSelector(targetSelector);

    const robotPlayer = useCallback(() => {
        let interval: NodeJS.Timeout;

        return {
            start: () => {
                interval = setInterval(() => {
                    const shootData = robotLogic(
                        targets,
                        emptyCells,
                        robotMode
                    );
                    dispatch(robotShoot(shootData));
                }, 1000);
            },
            stop: () => {
                clearInterval(interval);
            },
        };
    }, [dispatch, emptyCells, targets, robotMode]);

    useEffect(() => {
        const robot = robotPlayer();
        if (!(gameStatus === GameStatus.in_the_game && !canShoot)) {
            robot.stop();
        } else {
            robot.start();
        }

        return () => {
            robot.stop();
        };
    }, [gameStatus, canShoot, robotPlayer]);

    return null;
};

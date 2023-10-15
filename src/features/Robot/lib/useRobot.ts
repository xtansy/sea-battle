import { useEffect, useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
    canShootSelector,
    gameStatusSelector,
    robotShoot,
    GameStatus,
    targetSelector,
    Target,
} from "entities/game";
import { generateRandomInt } from "shared/lib";

export const useRobot = () => {
    const dispatch = useDispatch();
    const canShoot = useSelector(canShootSelector);
    const gameStatus = useSelector(gameStatusSelector);
    const targets = useSelector(targetSelector);

    const [previousHits, setPreviousHits] = useState<Target[]>([]); // Сохраняем предыдущие ходы

    const robotPlayer = useCallback(() => {
        let interval: NodeJS.Timeout;

        return {
            start: () => {
                interval = setInterval(() => {
                    const availableTargets = targets.filter(
                        (target) =>
                            !previousHits.some(
                                (hit) =>
                                    hit.x === target.x && hit.y === target.y
                            )
                    );

                    if (availableTargets.length > 0) {
                        const randomIndex = generateRandomInt(
                            0,
                            availableTargets.length - 1
                        );
                        const hit = availableTargets[randomIndex];
                        setPreviousHits([...previousHits, hit]);
                        dispatch(robotShoot(hit));
                    }
                }, 1000);
            },
            stop: () => {
                clearInterval(interval);
            },
        };
    }, [dispatch, previousHits, targets]);

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
    }, [gameStatus, canShoot]);

    return null;
};

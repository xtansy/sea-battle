import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    gameStatusSelector,
    canShootSelector,
    robotShoot,
    GameStatus,
} from "entities/game";

const robotLogick = () => {
    return {
        x: Math.floor(Math.random() * 10),
        y: Math.floor(Math.random() * 10),
    };
};
export const useRobot = () => {
    const dispatch = useDispatch();
    const canShoot = useSelector(canShootSelector);
    const gameStatus = useSelector(gameStatusSelector);

    const robotPlayer = useCallback(() => {
        let interval: NodeJS.Timeout;

        return {
            start: () => {
                interval = setInterval(
                    () => dispatch(robotShoot(robotLogick())),
                    1000
                );
            },
            stop: () => {
                clearInterval(interval);
            },
        };
    }, []);

    useEffect(() => {
        const robot = robotPlayer();
        if (!(gameStatus === GameStatus.in_the_game && !canShoot)) {
            // console.log("robot stop");
            robot.stop();
        } else {
            // console.log("robot start");
            robot.start();
        }
        return () => {
            // console.log("robot stop");
            robot.stop();
        };
    }, [gameStatus, canShoot]);
};

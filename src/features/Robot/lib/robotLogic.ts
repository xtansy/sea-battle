import { generateRandomInt } from "shared/lib";
import { type ShootData, type RobotMode } from "entities/game";

const getHitChance = (type: RobotMode) => {
    if (type === "easy") return 20;
    if (type === "medium") return 50;
    return 80;
};

export const robotLogic = (
    targets: ShootData[],
    emptyCells: ShootData[],
    mode: RobotMode
): ShootData => {
    const hitChance = getHitChance(mode);
    const randomInt = generateRandomInt(0, 100);
    console.log(randomInt);
    if (hitChance >= randomInt && targets.length > 0) {
        const hit = generateRandomInt(0, targets.length - 1);
        return targets[hit];
    }
    const randomShoot = generateRandomInt(0, emptyCells.length - 1);
    return emptyCells[randomShoot];
};

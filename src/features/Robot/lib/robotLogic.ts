import { generateRandomInt } from "shared/lib";
import { type ShootData } from "entities/game";

export const robotLogic = (
    targets: ShootData[],
    emptyCells: ShootData[]
): ShootData => {
    if (40 > generateRandomInt(0, 100) && targets.length > 0) {
        console.log("попал");
        const hit = generateRandomInt(0, targets.length - 1);
        return targets[hit];
    }
    const randomShoot = generateRandomInt(0, emptyCells.length - 1);
    return emptyCells[randomShoot];
};

import { type ShootData, type Handlers } from "./types";
import { type BoardData, GameType } from "../../model/types";

import { MAX_SHIPS } from "../constants";
import { shootCell } from "./shoot";

export const checkAllShipsDestroyed = (destroyed: number) => {
    return destroyed === MAX_SHIPS;
};

export const handleShoot = (
    { x, y }: ShootData,
    boardData: BoardData,
    gameType: GameType,
    handlers: Handlers
) => {
    const shootResult = shootCell({ x, y }, boardData);

    const isDamaged = !!shootResult;
    if (!isDamaged) {
        handlers.onMissed();
        return;
    }

    if (shootResult.destroyed && checkAllShipsDestroyed(boardData.destroyed)) {
        handlers.onAllShipsDestoyed();
    }

    if (gameType === GameType.in_turn) {
        handlers.onDamaged();
    }
};

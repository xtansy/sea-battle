import {
    type ShootResult,
    GameType,
    checkAllShipsDestroyed,
} from "entities/game";

interface Handlers {
    onDamaged: () => void;
    onMissed: () => void;
    onAllShipsDestoyed: () => void;
}

export const handleShoot = (
    shootResult: ShootResult,
    gameType: GameType,
    destroyed: number,
    handlers: Handlers
) => {
    const isDamaged = !!shootResult;
    if (!isDamaged) {
        handlers.onMissed();
        return;
    }

    if (shootResult.destroyed && checkAllShipsDestroyed(destroyed)) {
        handlers.onAllShipsDestoyed();
    }

    if (gameType === GameType.in_turn) {
        handlers.onDamaged();
    }
};

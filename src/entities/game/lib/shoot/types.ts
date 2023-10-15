export interface ShootData {
    x: number;
    y: number;
}

type Missed = false;
type Hit = { destroyed: boolean };
export type ShootResult = Hit | Missed;

export interface Handlers {
    onDamaged: () => void;
    onMissed: () => void;
    onAllShipsDestoyed: () => void;
}

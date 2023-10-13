export interface ShootData {
    x: number;
    y: number;
}

export interface HorizontalShip {
    startY: number;
    endY: number;
    x: number;
    type: "horizontal";
}

export interface VerticalShip {
    startX: number;
    endX: number;
    y: number;
    type: "vertical";
}

export interface OneCellShip {
    x: number;
    y: number;
    type: "oneCell";
}

export type Ship = HorizontalShip | VerticalShip | OneCellShip;

type Missed = false;

interface Hit {
    destroyed: boolean;
}

export type ShootResult = Hit | Missed;

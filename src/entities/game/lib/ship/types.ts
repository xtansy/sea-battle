export { type ICell, CellStatus } from "../../model/types";
export { type ShootData } from "../shoot/types";

export interface HorizontalShipCoords {
    startX: number;
    endX: number;
    y: number;
    type: "horizontal";
}

export interface VerticalShipCoords {
    startY: number;
    endY: number;
    x: number;
    type: "vertical";
}

export interface OneCellShipCoords {
    x: number;
    y: number;
    type: "oneCell";
}

export type ShipCoords =
    | HorizontalShipCoords
    | VerticalShipCoords
    | OneCellShipCoords;

export type ShipLength = 4 | 3 | 2 | 1;

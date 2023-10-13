import { MAX_SHIPS } from ".";

export const checkAllShipsDestroyed = (destroyed: number) => {
    return destroyed === MAX_SHIPS;
};

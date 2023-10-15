import { createSelector } from "@reduxjs/toolkit";

import { countShips, findTargets } from "entities/game";

export const gameTypeSelector = (state: RootState) => state.game.gameType;

export const enemyBoardDataSelector = (state: RootState) =>
    state.game.enemyBoardData;

export const myBoardDataSelector = (state: RootState) => state.game.myBoardData;

export const gameStatusSelector = (state: RootState) => state.game.gameStatus;

export const canShootSelector = (state: RootState) => state.game.canShoot;

export const myBoardSelector = (state: RootState) =>
    state.game.myBoardData.board;

export const shipsCountSelector = createSelector(myBoardSelector, (board) => {
    return countShips(board);
});

export const devModeSelector = (state: RootState) => state.game.devMode;

export const targetSelector = createSelector(myBoardSelector, (board) =>
    findTargets(board)
);

export const gameTypeSelector = (state: RootState) => state.game.gameType;

export const enemyBoardDataSelector = (state: RootState) =>
    state.game.enemyBoardData;

export const myBoardDataSelector = (state: RootState) => state.game.myBoardData;

export const gameStatusSelector = (state: RootState) => state.game.gameStatus;

export const canShootSelector = (state: RootState) => state.game.canShoot;

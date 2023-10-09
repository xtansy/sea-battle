export const gameTypeSelector = (state: RootState) => state.game.gameType;

export const enemyBoardSelector = (state: RootState) =>
    state.game.enemyBoardData.board;

export const myBoardSelector = (state: RootState) =>
    state.game.myBoardData.board;

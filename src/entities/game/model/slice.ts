import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { type GameModel, type ICell, CellStatus } from "./types";

const createMatrix = () => {
    const matrix: ICell[][] = [];
    for (let i = 0; i < 10; i++) {
        matrix[i] = [];
        for (let j = 0; j < 10; j++) {
            matrix[i][j] = { status: CellStatus.empty, x: i, y: j };
        }
    }
    return matrix;
};

const dummy: ICell[][] = createMatrix();

const initialState: GameModel = {
    gameType: null,
    myBoardData: { destroyed: 0, board: dummy },
    enemyBoardData: { destroyed: 0, board: dummy },
};

export const gameModel = createSlice({
    name: "game",
    initialState,
    reducers: {
        enterGameType: (
            state,
            { payload }: PayloadAction<GameModel["gameType"]>
        ) => {
            state.gameType = payload;
        },
    },
});

export const { enterGameType } = gameModel.actions;

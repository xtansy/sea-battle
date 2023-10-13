import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { type GameModel, type ICell, CellStatus, GameStatus } from "./types";
import { shootCell, type ShootData, generateRandomBoolean } from "../lib";
import { handleShoot } from "./handleShoot";

const createMatrix = () => {
    const board: ICell[][] = [];

    for (let i = 0; i < 10; i++) {
        board[i] = [];
        for (let j = 0; j < 10; j++) {
            board[i][j] = { x: i, y: j, status: CellStatus.empty };
        }
    }

    // 4
    for (let i = 3; i < 7; i++) {
        board[0][i].status = CellStatus.with_ship;
    }

    // 3
    for (let i = 2; i < 5; i++) {
        board[2][i].status = CellStatus.with_ship;
    }
    for (let i = 7; i < 10; i++) {
        board[2][i].status = CellStatus.with_ship;
    }

    // 2
    for (let i = 4; i < 6; i++) {
        board[4][i].status = CellStatus.with_ship;
    }
    for (let i = 7; i < 9; i++) {
        board[4][i].status = CellStatus.with_ship;
    }
    for (let i = 7; i < 9; i++) {
        board[6][i].status = CellStatus.with_ship;
    }

    // 1
    board[2][0].status = CellStatus.with_ship;
    board[4][0].status = CellStatus.with_ship;
    board[6][0].status = CellStatus.with_ship;
    board[8][0].status = CellStatus.with_ship;

    return board;
};

const dummy: ICell[][] = createMatrix();

const initialState: GameModel = {
    gameType: null,
    gameStatus: GameStatus.preparation,

    canShoot: false,
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

        shoot: (state, { payload }: PayloadAction<ShootData>) => {
            if (!state.gameType) return;
            const shootResult = shootCell(payload, state.enemyBoardData);
            handleShoot(
                shootResult,
                state.gameType,
                state.enemyBoardData.destroyed,
                {
                    onMissed: () => {
                        state.canShoot = false;
                    },
                    onDamaged: () => {
                        state.canShoot = false;
                    },
                    onAllShipsDestoyed: () => {
                        state.canShoot = false;
                        state.gameStatus = GameStatus.victory;
                    },
                }
            );
        },

        robotShoot: (state, { payload }: PayloadAction<ShootData>) => {
            if (!state.gameType) return;
            const shootResult = shootCell(payload, state.myBoardData);
            handleShoot(
                shootResult,
                state.gameType,
                state.myBoardData.destroyed,
                {
                    onMissed: () => {
                        state.canShoot = true;
                    },
                    onDamaged: () => {
                        state.canShoot = true;
                    },
                    onAllShipsDestoyed: () => {
                        state.gameStatus = GameStatus.defeat;
                    },
                }
            );
        },

        startGame: (state) => {
            state.gameStatus = GameStatus.in_the_game;
            state.canShoot = generateRandomBoolean();
        },

        restartGame: (state) => {
            state.myBoardData.board = dummy;
            state.myBoardData.destroyed = 0;

            state.enemyBoardData.board = dummy;
            state.enemyBoardData.destroyed = 0;

            state.canShoot = false;
            state.gameStatus = GameStatus.preparation;
        },
    },
});

export const { enterGameType, startGame, shoot, restartGame, robotShoot } =
    gameModel.actions;

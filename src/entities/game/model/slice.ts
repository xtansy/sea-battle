import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { type GameModel, type ICell, GameStatus } from "./types";
import {
    type ShootData,
    EMPTY_BOARD,
    randomPlaceShip,
    emptyFilledBoard,
    addShipToBoard,
    handleShoot,
    ShipType,
    removeShipFromBoard,
    clearBoard,
} from "../lib";

import { generateRandomBoolean } from "shared/lib";

// const createMatrix = () => {
//     const board: ICell[][] = [];

//     for (let i = 0; i < 10; i++) {
//         board[i] = [];
//         for (let j = 0; j < 10; j++) {
//             board[i][j] = { x: i, y: j, status: CellStatus.empty };
//         }
//     }

//     // 4
//     for (let i = 3; i < 7; i++) {
//         board[0][i].status = CellStatus.with_ship;
//     }

//     // 3
//     for (let i = 2; i < 5; i++) {
//         board[2][i].status = CellStatus.with_ship;
//     }
//     for (let i = 7; i < 10; i++) {
//         board[2][i].status = CellStatus.with_ship;
//     }

//     // 2
//     for (let i = 4; i < 6; i++) {
//         board[4][i].status = CellStatus.with_ship;
//     }
//     for (let i = 7; i < 9; i++) {
//         board[4][i].status = CellStatus.with_ship;
//     }
//     for (let i = 7; i < 9; i++) {
//         board[6][i].status = CellStatus.with_ship;
//     }

//     // 1
//     board[2][0].status = CellStatus.with_ship;
//     board[4][0].status = CellStatus.with_ship;
//     board[6][0].status = CellStatus.with_ship;
//     board[8][0].status = CellStatus.with_ship;

//     return board;
// };

const dummy: ICell[][] = EMPTY_BOARD;

const initialState: GameModel = {
    gameType: null,
    gameStatus: GameStatus.preparation,

    canShoot: false,
    myBoardData: { destroyed: 0, board: dummy },
    enemyBoardData: { destroyed: 0, board: dummy },

    devMode: false, // for your convenience, checking the logic of victory
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

            handleShoot(payload, state.enemyBoardData, state.gameType, {
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
            });
        },

        robotShoot: (state, { payload }: PayloadAction<ShootData>) => {
            if (!state.gameType) return;
            handleShoot(payload, state.myBoardData, state.gameType, {
                onMissed: () => {
                    state.canShoot = true;
                },
                onDamaged: () => {
                    state.canShoot = true;
                },
                onAllShipsDestoyed: () => {
                    state.gameStatus = GameStatus.defeat;
                },
            });
        },

        startGame: (state) => {
            state.myBoardData.destroyed = 0;
            clearBoard(state.myBoardData.board);

            state.enemyBoardData.destroyed = 0;
            emptyFilledBoard(state.enemyBoardData.board);
            randomPlaceShip(state.enemyBoardData.board);

            state.gameStatus = GameStatus.in_the_game;
            state.canShoot = generateRandomBoolean();
        },

        restartGame: (state) => {
            state.myBoardData.destroyed = 0;
            clearBoard(state.myBoardData.board);

            state.enemyBoardData.destroyed = 0;
            emptyFilledBoard(state.enemyBoardData.board);

            state.canShoot = false;
            state.gameStatus = GameStatus.preparation;
        },

        randomPlaceMyShip: (state) => {
            emptyFilledBoard(state.myBoardData.board);
            randomPlaceShip(state.myBoardData.board);
        },

        addShip: (
            state,
            {
                payload,
            }: PayloadAction<{
                shipType: ShipType;
                startX: number;
                startY: number;
                endX: number;
                endY: number;
            }>
        ) => {
            const { shipType, startX, startY, endX, endY } = payload;
            addShipToBoard(
                state.myBoardData.board,
                shipType,
                startX,
                startY,
                endX,
                endY
            );
        },

        removeShip: (
            state,
            {
                payload,
            }: PayloadAction<{
                x: number;
                y: number;
            }>
        ) => {
            const { x, y } = payload;
            removeShipFromBoard(x, y, state.myBoardData.board);
        },

        toggleDevMode: (state) => {
            state.devMode = !state.devMode;
        },
    },
});

export const {
    enterGameType,
    toggleDevMode,
    startGame,
    shoot,
    restartGame,
    robotShoot,
    removeShip,
    randomPlaceMyShip,
    addShip,
} = gameModel.actions;

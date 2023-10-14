import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GameType } from "entities/game/@x/user";

import { GameResult, type UserModel } from "./types";

const initialState: UserModel = {
    name: null,
    winsCount: 0,
    defeatCount: 0,
    gameStories: [],
};

export const userModel = createSlice({
    name: "user",
    initialState,
    reducers: {
        enterName: (state, { payload }: PayloadAction<UserModel["name"]>) => {
            state.name = payload;
        },
        removeName: (state) => {
            state.name = null;
        },
        win: (state, { payload }: PayloadAction<GameType>) => {
            state.winsCount++;
            state.gameStories.push({
                timestamp: new Date().getTime(),
                result: GameResult.wictory,
                gameType: payload,
            });
        },
        lose: (state, { payload }: PayloadAction<GameType>) => {
            state.defeatCount++;
            state.gameStories.push({
                timestamp: new Date().getTime(),
                result: GameResult.defeat,
                gameType: payload,
            });
        },
    },
});

export const { enterName, removeName, win, lose } = userModel.actions;

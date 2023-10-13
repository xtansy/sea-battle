import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { GameResult, type UserModel } from "./types";

const initialState: UserModel = {
    name: null,
    winsCount: 0,
    defeatCount: 0,
    gamesStory: [],
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
        win: (state) => {
            state.winsCount++;
            state.gamesStory.push({
                date: new Date(),
                result: GameResult.wictory,
            });
        },
        lose: (state) => {
            state.defeatCount++;
            state.gamesStory.push({
                date: new Date(),
                result: GameResult.defeat,
            });
        },
    },
});

export const { enterName, removeName, win, lose } = userModel.actions;

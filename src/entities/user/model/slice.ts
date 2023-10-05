import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { type UserModel } from "./types";

const initialState: UserModel = {
    name: null,
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
    },
});

export const { enterName, removeName } = userModel.actions;

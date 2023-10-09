import { userModel } from "entities/user";
import { gameModel } from "entities/game";

import { combineReducers } from "@reduxjs/toolkit";

export const rootReducer = combineReducers({
    user: userModel.reducer,
    game: gameModel.reducer,
});

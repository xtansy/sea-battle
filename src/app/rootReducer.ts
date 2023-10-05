import { userModel } from "entities/user";

import { combineReducers } from "@reduxjs/toolkit";

export const rootReducer = combineReducers({
    user: userModel.reducer,
});

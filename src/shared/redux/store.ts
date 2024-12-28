import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { accountSliceReducer } from "@/shared/redux/reducers/account.reducer.ts";

export const createStore = () =>
    configureStore({
        reducer: rootReducer,
    });

const rootReducer = combineReducers({
    account: accountSliceReducer,
});

const store = createStore();

export const initStore = () => {
    return store;
};

export type RootReducer = ReturnType<typeof rootReducer>;
export type RootStore = ReturnType<typeof initStore>;
export type RootState = ReturnType<RootStore["getState"]>;
export type AppDispatch = RootStore["dispatch"];
export type AsyncThunkConfig = { state: RootState; dispatch: AppDispatch };

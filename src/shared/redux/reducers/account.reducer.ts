import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import type { UserData } from "@/entities/user/types.ts";
import { signInAction } from "@/shared/redux/actions/signInAction";
import { FetchStatus } from "@/shared/types/service";

export interface AccountState {
    loginStatus: FetchStatus;
    loginError: string | null;
    registerStatus: FetchStatus;
    registerError: string | null;
    userData: UserData | null;
    isFirstLogin: boolean;
}

const initialState: AccountState = {
    loginStatus: FetchStatus.IDLE,
    loginError: null,
    registerStatus: FetchStatus.IDLE,
    registerError: null,
    userData: null,
    isFirstLogin: false,
};

const accountSlice = createSlice({
    name: "ACCOUNT",
    initialState,
    reducers: {
        setFirstLogin: (state, action: PayloadAction<boolean>) => {
            state.isFirstLogin = action.payload;
        },
        resetAccountStores: () => initialState,
    },
    extraReducers: (builder) => {
        // builder.addCase(getAuthDataAction.pending, (state) => {
        //     state.loginStatus = FetchStatus.PENDING;
        //     state.loginError = null;
        // });
        // builder.addCase(getAuthDataAction.fulfilled, (state, action) => {
        //     state.loginStatus = FetchStatus.FULFILLED;
        //     state.loginError = null;
        //     state.userData = action.payload;
        // });
        // builder.addCase(getAuthDataAction.rejected, (state, action) => {
        //     state.loginStatus = FetchStatus.REJECTED;
        //     state.loginError = action.error.message || null;
        // });

        builder.addCase(signInAction.pending, (state) => {
            state.loginStatus = FetchStatus.PENDING;
            state.loginError = null;
            state.userData = null;
        });
        builder.addCase(signInAction.fulfilled, (state, action: PayloadAction<UserData>) => {
            state.loginStatus = FetchStatus.FULFILLED;
            state.loginError = null;
            state.userData = action.payload;
        });
        builder.addCase(signInAction.rejected, (state, action) => {
            state.loginStatus = FetchStatus.REJECTED;
            state.loginError = action.error.message || "";
            state.userData = null;
        });
    },
});

export const accountSliceReducer = accountSlice.reducer;
export const accountSliceActions = accountSlice.actions;

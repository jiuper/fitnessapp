import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAuthApi, RequestAuthDto } from "@/entities/user/getAuth";
import type { GetAuthApiResponse } from "@/entities/user/getAuth/types.ts";
import { AsyncThunkConfig } from "@/shared/redux/store.ts";

export const signInAction = createAsyncThunk<GetAuthApiResponse,RequestAuthDto,AsyncThunkConfig>(
    "ACCOUNT/SIGN_IN",
    async (params ) => {
        try {
            const token =  await getAuthApi(params)
            sessionStorage.setItem("token", token.token);

            return token;

        } catch (e) {
            throw new Error("Unauthorized");
        }
    },
);

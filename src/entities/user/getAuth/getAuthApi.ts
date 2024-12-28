import type { GetAuthApiResponse } from "@/entities/user/getAuth/types.ts";
import type { UserDataAdd } from "@/entities/user/types.ts";
import { createAxiosApi } from "@/shared/api";

export type RequestAuthDto = {
    name?: string;
    user?: UserDataAdd;
};

export const getAuthApi = async (params: RequestAuthDto) => {
    return createAxiosApi()<GetAuthApiResponse>({
        type: "post",
        url: "client/add",
        body: params,
    }).then((data) => data.data);
};

import { useQuery } from "@tanstack/react-query";

import type { UserDataAdd } from "@/entities/user/types.ts";
import { createAxiosApi } from "@/shared/api";

export type RequestAuthDto = {
    user?: string;
};

export const getUserAPI = async (params: RequestAuthDto) => {
    return createAxiosApi()<UserDataAdd>({
        type: "post",
        url: "/user/get-by-user",
        body: params,
    }).then((data) => data.data);
};

export const useQueryUser = (user?: string) => {
    return useQuery({
        queryKey: ["userDataCreate", user],
        queryFn: () => getUserAPI({ user }),
        enabled: !!user,
    });
};

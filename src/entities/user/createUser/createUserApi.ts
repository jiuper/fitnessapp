import { useQuery } from "@tanstack/react-query";

import type { UserDataAdd } from "@/entities/user/types.ts";
import { createAxiosApi } from "@/shared/api";

export type RequestAuthDto = {
    tgUserid: string;
};

export const createUserApi = async (params: RequestAuthDto) => {
    return createAxiosApi()<UserDataAdd>({
        type: "post",
        url: "/user/add",
        body: params,
    }).then((data) => data.data);
};

export const useQueryUserCreate = (tgUserid: string) => {
    return useQuery({
        queryKey: ["userDataCreate", tgUserid],
        queryFn: () => createUserApi({ tgUserid }),
        enabled: !!tgUserid,
    });
};

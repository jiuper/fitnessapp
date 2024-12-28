import { useQueries } from "@tanstack/react-query";

import type { GetMasterApiResponse, GetSingleMasterApiResponse } from "@/entities/masters/api/getMasterApi/types.ts";
import type { GetMasterFullInfoDto } from "@/entities/masters/types.ts";
import { createAxiosApi } from "@/shared/api";

export const getMasterApi = async (id: string) => {
    return createAxiosApi()<GetSingleMasterApiResponse>({
        type: "get",
        url: `booking/masters/master/full-info`,
        config: { params: { masterId: id } },
    }).then((data) => data.data);
};

export const useMasterQuery = (params: string[]): GetMasterApiResponse => {
    return <GetMasterFullInfoDto[]>useQueries({
        queries: params.map((user) => {
            return {
                queryKey: ["info-master", user],
                queryFn: () => getMasterApi(user),
                enabled: !!user,
            };
        }),
        combine: (result) => result.filter((el) => el.data !== undefined).map((el) => el.data),
    });
};

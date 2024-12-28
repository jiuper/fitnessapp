import { useQuery } from "@tanstack/react-query";

import type { GetInfoTimesApiResponse } from "@/entities/order/api/getTimesMasterInfo/types.ts";
import type { RequestGetDateTimesDto } from "@/entities/order/types.ts";
import { createAxiosApi } from "@/shared/api";

export const getTimesMasterInfo = async (params: RequestGetDateTimesDto) => {
    return createAxiosApi()<GetInfoTimesApiResponse>({
        type: "post",
        url: "record/get-free-slots-week",
        body: params,
    }).then((data) => data.data);
};

export const useTimesMasterInfoQuery = (params: RequestGetDateTimesDto) => {
    return useQuery<GetInfoTimesApiResponse>({
        queryKey: ["times-info-master", params],
        queryFn: () => getTimesMasterInfo(params),
        enabled: !!params,
    });
};

import { useQuery } from "@tanstack/react-query";

import type { GetInfoAllTimesApiResponse } from "@/entities/order/api/getAllTimesMasterInfo/types.ts";
import type { RequestGetDatesTrueDto } from "@/entities/order/types.ts";
import { createAxiosApi } from "@/shared/api";

export const getAllTimesMasterInfo = async (params: RequestGetDatesTrueDto) => {
    return createAxiosApi()<GetInfoAllTimesApiResponse>({
        type: "post",
        url: "record/get-free-slots-period",
        body: params,
    }).then((data) => data.data);
};

export const useAllTimesMasterInfoQuery = (params: RequestGetDatesTrueDto) => {
    return useQuery<GetInfoAllTimesApiResponse>({
        queryKey: ["times-info-master", params],
        queryFn: () => getAllTimesMasterInfo(params),
    });
};

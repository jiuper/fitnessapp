import { useQuery } from "@tanstack/react-query";

import type { GetMultiMasterApiResponse } from "@/entities/masters/api/getMultiMasterApi/types.ts";
import { createAxiosApi } from "@/shared/api";

export const getMultiMasterApi = async (params: { serviceId: string[] }) => {
    return createAxiosApi()<GetMultiMasterApiResponse>({
        type: "get",
        url: "/booking/get-masters-multi",
        config: { params },
    }).then((data) => data.data);
};

export const useQueryMultiMasters = (params: { serviceId: string[] }) => {
    return useQuery<GetMultiMasterApiResponse>({
        queryKey: ["list-multi-masters", params],
        queryFn: () => getMultiMasterApi(params),
        enabled: !!params.serviceId.length,
    });
};

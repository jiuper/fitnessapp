import { useQuery } from "@tanstack/react-query";

import type { GetInfoCompanyApiResponse } from "@/entities/company/api/getInfoCompanyApi/types.ts";
import { createAxiosApi } from "@/shared/api";

export const getInfoCompanyApi = async () => {
    return createAxiosApi()<GetInfoCompanyApiResponse>({
        type: "get",
        url: "gym/get-all",
    }).then((data) => data.data);
};

export const useInfoCompanyQuery = () => {
    return useQuery<GetInfoCompanyApiResponse>({
        queryKey: ["info-gym"],
        queryFn: () => getInfoCompanyApi(),
    });
};

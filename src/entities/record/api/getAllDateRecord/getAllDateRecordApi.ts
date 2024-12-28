import { useQuery } from "@tanstack/react-query";

import type { GetAllDateRecordResponse } from "@/entities/record/api/getAllDateRecord/types.ts";
import { createAxiosApi } from "@/shared/api";

export const getAllDateRecord = async (dateFrom: string, dateTo: string) => {
    const data = await createAxiosApi()<GetAllDateRecordResponse>({
        url: "record/get-date",
        type: "get",
        config: { params: { dateFrom, dateTo } },
    });

    return data.data;
};

export const useGetAllDateRecordQuery = (dateFrom: string, dateTo: string) => {
    return useQuery({
        queryKey: ["getAllDateRecord", dateFrom, dateTo],
        queryFn: () => getAllDateRecord(dateFrom, dateTo),
        enabled: !!dateFrom && !!dateTo,
    });
};

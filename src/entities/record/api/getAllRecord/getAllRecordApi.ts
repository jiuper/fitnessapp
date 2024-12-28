import { useQuery } from "@tanstack/react-query";

import type { GetAllRecordApiResponse } from "@/entities/record/api/getAllRecord/types.ts";
import { createAxiosApi } from "@/shared/api";

export const getAllRecordApi = async (date: string) => {
    const data = await createAxiosApi()<GetAllRecordApiResponse>({
        url: "record",
        type: "get",
        config: { params: { date } },
    });

    return data.data;
};

export const useGetAllRecordQuery = (date: string) => {
    return useQuery({
        queryKey: ["getAllRecord", date],
        queryFn: () => getAllRecordApi(date),
        enabled: !!date,
    });
};

import { useQuery } from "@tanstack/react-query";

import type { GetRecordApiResponse } from "@/entities/record/api/getRecord/types.ts";
import { createAxiosApi } from "@/shared/api";

export const getRecordApi = async (id: string) => {
    const data = await createAxiosApi()<GetRecordApiResponse>({
        type: "get",
        url: `${"record"}/${id}`,
    });

    return data.data;
};

export const useRecordQuery = (id: string) => {
    return useQuery({
        queryKey: ["getRecordQuery", id],
        queryFn: () => getRecordApi(id),
        enabled: !!id,
    });
};

import { useMutation } from "@tanstack/react-query";

import { createAxiosApi } from "@/shared/api";

export const removeRecordApi = async (id: string) => {
    const data = await createAxiosApi()({ type: "delete", url: `booking/remove-record`, config: { params: { id } } });

    return data.data;
};

export const useRemoveRecord = () => {
    return useMutation({
        mutationFn: removeRecordApi,
    });
};

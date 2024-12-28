import { useMemo } from "react";
import { useParams } from "react-router";

import { useAllServicesQuery } from "@/entities/services/api/getAllServicesApi";
import { PageLayout } from "@/layouts/PageLayout.tsx";
import { ServicePage } from "@/view";

export const Service = () => {
    const { id } = useParams();
    const { data } = useAllServicesQuery();
    const listData = useMemo(() => data || [], [data]);

    const filterListData = useMemo(
        () => listData.filter((el) => el?.id?.toString() === id),
        [listData, id],
    );

    return (
        <PageLayout>
            <ServicePage data={filterListData} />
        </PageLayout>
    );
};

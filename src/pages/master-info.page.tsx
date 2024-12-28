import { useMemo } from "react";
import { useParams } from "react-router";

import { useAllServicesQuery } from "@/entities/services/api/getAllServicesApi";
import { PageLayout } from "@/layouts/PageLayout.tsx";
import { useClientContext } from "@/shared/context/ClientProvider.tsx";
import { MasterInfoPage } from "@/view/MasterInfoPage/MasterInfoPage.tsx";

export function MasterInfo() {
    const { id } = useParams();
    const { listMaster } = useClientContext();
    const { data: listData } = useAllServicesQuery();
    const listService = useMemo(() => listData || [], [listData]);
    const data = useMemo(
        () => listMaster.filter((el) => el.id?.toString() === id?.toString())[0],
        [listMaster, id],
    );

    return (
        <PageLayout>
            <MasterInfoPage listService={listService} data={data} masterId={id} />
        </PageLayout>
    );
}

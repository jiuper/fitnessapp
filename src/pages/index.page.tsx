import { useMemo } from "react";

import { useAllServicesQuery } from "@/entities/services/api/getAllServicesApi";
import { PageLayout } from "@/layouts/PageLayout.tsx";
import { useClientContext } from "@/shared/context/ClientProvider.tsx";
import { IndexPage } from "@/view/IndexPage";

export function Index() {
    const { companyInfo, listMaster } = useClientContext();
    const { data } = useAllServicesQuery();
    const listService = useMemo(() => data || [], [data]);

    return (
        <PageLayout>
            <IndexPage listService={listService} listGym={companyInfo} listStaff={listMaster} />
        </PageLayout>
    );
}

import { useMemo } from "react";

import { useAllMastersQuery } from "@/entities/masters/api/getAllMastersApi";
import { PageLayout } from "@/layouts/PageLayout.tsx";
import { useClientContext } from "@/shared/context/ClientProvider.tsx";
import { MasterBookingPage } from "@/view";

export function MasterBooking() {
    const { data: listMaster } = useAllMastersQuery(true);
    const { companyInfo } = useClientContext();

    const listMasterData = useMemo(() => listMaster || [], [listMaster]);

    return (
        <PageLayout>
            <MasterBookingPage
                listGym={companyInfo}
                data={listMasterData}
                isServices={false}
                servicesId={[]}
            />
        </PageLayout>
    );
}

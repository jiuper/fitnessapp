import { useMemo } from "react";

import { useAllServicesQuery } from "@/entities/services/api/getAllServicesApi";
import { PageLayout } from "@/layouts/PageLayout.tsx";
import { ServicesBookingPage } from "@/view";

export function ServicesBooking() {
    const { data } = useAllServicesQuery();
    const listData = useMemo(() => data || [], [data]);

    return (
        <PageLayout>
            <ServicesBookingPage data={listData} />
        </PageLayout>
    );
}

import { useMemo } from "react";

import { useQueryMultiMasters } from "@/entities/masters/api/getMultiMasterApi";
import type { GetMasterDto } from "@/entities/masters/types.ts";
import { PageLayout } from "@/layouts/PageLayout.tsx";
import { useClientContext, useClientContextMutate } from "@/shared/context/ClientProvider.tsx";
import { MasterBookingPage } from "@/view";

export function MasterFilter() {
    const { booking } = useClientContext();
    const { handleAddMasterBooking } = useClientContextMutate();
    const servicesId = booking.reduce<string[]>(
        (acc, el) => [
            ...acc,
            ...(el.masterInfo?.services?.map((elem) => elem?.id?.toString() || "") || []),
        ],
        [],
    );

    const { data: listMultiMaster, isPending: isLoadingMultiMasters } = useQueryMultiMasters({
        serviceId: servicesId,
    });

    const listMultiMasterData = useMemo(
        () =>
            listMultiMaster
                ? listMultiMaster.reduce<GetMasterDto[]>((acc, cur) => {
                      acc.push({ ...cur, id: cur.id || "", name: cur.name || "" });

                      return acc.filter(
                          (el, i) => acc.findIndex((elem) => elem?.id === el.id) === i,
                      );
                  }, [])
                : [],
        [listMultiMaster],
    );

    return (
        <PageLayout>
            <MasterBookingPage
                data={listMultiMasterData}
                isPending={isLoadingMultiMasters}
                isServices
                servicesId={servicesId}
                addMasterBooking={handleAddMasterBooking}
            />
        </PageLayout>
    );
}

import { useMemo } from "react";
import { useParams } from "react-router";

import { PageLayout } from "@/layouts/PageLayout.tsx";
import { useClientContext, useClientContextMutate } from "@/shared/context/ClientProvider.tsx";
import { TimesBooking } from "@/view/TimesBooking";

export const TimesBookingPage = () => {
    const { id } = useParams();
    const { booking } = useClientContext();
    const { handleAddWorkDateBooking } = useClientContextMutate();
    const filterListData = useMemo(
        () => booking.find((el) => el?.masterInfo?.id?.toString() === id?.toString()),
        [booking, id],
    );

    return (
        <PageLayout>
            <TimesBooking
                data={filterListData}
                masterId={id}
                handleAddWorkDateBooking={handleAddWorkDateBooking}
            />
        </PageLayout>
    );
};

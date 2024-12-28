import { useMemo } from "react";

import { PageLayout } from "@/layouts/PageLayout.tsx";
import { useClientContext, useClientContextMutate } from "@/shared/context/ClientProvider.tsx";
import { OrderPage } from "@/view";

export const IndexOrderPage = () => {
    const { booking, listMaster } = useClientContext();
    const { handleEditBooking, handleRemoveServiceBooking, handleResetBooking } =
        useClientContextMutate();
    const masterInfo = useMemo(
        () => listMaster.find((el) => el.id === (booking.length ? booking[0].masterInfo?.id : "")),
        [booking, listMaster],
    );

    return (
        <PageLayout>
            <OrderPage
                masterInfo={masterInfo}
                booking={booking}
                currencyShortTitle="BYN"
                handleEditBooking={handleEditBooking}
                handleRemoveServiceBooking={handleRemoveServiceBooking}
                handleResetBooking={handleResetBooking}
            />
        </PageLayout>
    );
};

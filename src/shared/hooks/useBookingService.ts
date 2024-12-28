import { useEffect, useMemo, useState } from "react";

import type { MasterServiceInfo } from "@/entities/masters/types.ts";
import { useClientContext, useClientContextMutate } from "@/shared/context/ClientProvider.tsx";
import { useBooleanState } from "@/shared/hooks/useBooleanState.ts";

export const useBookingService = (data: MasterServiceInfo[]) => {
    const { booking } = useClientContext();
    const { handleRemoveServiceBooking } = useClientContextMutate();
    const servicesId = booking.reduce<string[]>(
        (acc, cur) => [...acc, ...(cur.masterInfo?.services?.map((elem) => elem.id) || [])],
        [],
    );
    const [serviceId, setServiceId] = useState<string>("");
    const [isOpenModalService, onOpenModalService, onCloseModalService] = useBooleanState(false);
    const [isOpenModalBookingService, onOpenModalBookingService, onCloseModalBookingService] = useBooleanState(false);
    const filterBooking = useMemo(
        () =>
            booking.find((service) => service.masterInfo?.services?.find((el) => servicesId.includes(el.id)))
                ?.masterInfo?.services,
        [booking, servicesId],
    );

    const service = useMemo(() => data?.find((service) => service.id === serviceId), [data, serviceId]);

    const price = useMemo(
        () =>
            filterBooking
                ? filterBooking
                      .filter((el) => servicesId.includes(el.id))
                      .reduce((acc, el) => acc + (el.priceMax || 0), 0)
                : 0,
        [filterBooking, servicesId],
    );

    const time = useMemo(
        () =>
            filterBooking
                ? filterBooking.filter((el) => servicesId.includes(el.id)).reduce((acc, el) => acc + (el.time || 0), 0)
                : 0,
        [filterBooking, servicesId],
    );

    const handleOpenModalService = (serviceId?: string, flag?: boolean) => {
        const singleData = data.find((el) => el.id === serviceId);

        if (flag && serviceId) {
            setServiceId(serviceId);
            onOpenModalService();
        }

        if (singleData && !flag && serviceId) {
            handleRemoveServiceBooking(singleData);
        }
    };

    const handleOpenModalDetailsService = (serviceId?: string) => {
        const singleData = data.find((el) => el.id === serviceId);

        if (singleData && serviceId) {
            handleRemoveServiceBooking(singleData);
        }
        onCloseModalService();
    };

    useEffect(() => {
        if (servicesId.length === 0) onCloseModalBookingService();
        else onOpenModalBookingService();
    }, [onCloseModalBookingService, onOpenModalBookingService, servicesId.length]);

    return {
        servicesId,
        price,
        time,
        service,
        isOpenModalBookingService,
        isOpenModalService,
        onCloseModalService,
        handleOpenModalService,
        handleOpenModalDetailsService,
    };
};

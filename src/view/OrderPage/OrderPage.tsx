import { useMemo } from "react";
import { useNavigate } from "react-router";
import cnBind from "classnames/bind";

import { FormOrder } from "@/_Forms/FormOrder";
import type { GetMasterFullInfoDto, MasterServiceInfo } from "@/entities/masters/types.ts";
import notFoundMaster from "@/shared/assets/images/Empty-image-icon.png";
import { ROUTES } from "@/shared/const/Routes.ts";
import type { BookingData } from "@/shared/context/ClientProvider.tsx";
import { CardOrder } from "@/view/OrderPage/components/CardOrder";
import { dateFormat } from "@/view/RecordPage";

import styles from "./OrderPage.module.scss";

const cx = cnBind.bind(styles);
type OrderPageProps = {
    booking: BookingData[];
    masterInfo?: GetMasterFullInfoDto;
    currencyShortTitle?: string;
    handleEditBooking: (id: string) => void;
    handleRemoveServiceBooking: (serviceId: MasterServiceInfo) => void;
    handleResetBooking: () => void;
};

export const OrderPage = ({
    handleEditBooking,
    booking,
    currencyShortTitle,
    handleRemoveServiceBooking,
    handleResetBooking,
    masterInfo,
}: OrderPageProps) => {
    const href = useNavigate();
    const time = useMemo(
        () =>
            booking.map((el) =>
                el.masterInfo?.services?.reduce((acc, el) => acc + (el.time || 0), 0),
            )[0],
        [booking],
    );
    const handleEditMaster = (id: string) => {
        href(ROUTES.BOOKING);
        handleEditBooking(id);
    };

    return (
        <div className={cx("wrapper", "container")}>
            <div className={cx("title")}>
                <span>Проверьте запись</span>
            </div>

            {booking.length ? (
                booking.map((el, i) => (
                    <div key={i} className={cx("cards")}>
                        <CardOrder
                            icon="edit"
                            rating={el.masterInfo?.rating}
                            avatar={el.masterInfo?.image || notFoundMaster}
                            name={el.masterInfo?.name}
                            post={el.masterInfo?.post}
                            onClick={() => handleEditMaster(el.masterInfo?.id || "")}
                        />

                        <CardOrder
                            icon="edit"
                            onClick={() => href(`${ROUTES.TIMESBOOKING}/${el.masterInfo?.id}`)}
                            name={dateFormat(
                                `${`${el.workData?.date}${el.workData?.time}` || ""}`,
                                time || 0,
                            )}
                        />
                        {el.masterInfo?.services?.map((elem) => (
                            <CardOrder
                                key={elem.id}
                                icon="remove"
                                avatar={elem.image || notFoundMaster}
                                name={elem.name}
                                post={`${elem.time} мин`}
                                price={`${elem.priceMax} ${currencyShortTitle}`}
                                onClick={() => handleRemoveServiceBooking(elem)}
                            />
                        ))}
                    </div>
                ))
            ) : (
                <div onClick={() => href(`${ROUTES.BOOKING}`)}>Добавить Услугу</div>
            )}

            {booking.length ? (
                <FormOrder
                    masterInfo={masterInfo}
                    handleResetBooking={handleResetBooking}
                    booking={booking}
                />
            ) : null}
        </div>
    );
};

import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import cnBind from "classnames/bind";

import { Calendar } from "@/components/Calendar";
import { useAllTimesMasterInfoQuery } from "@/entities/order/api/getAllTimesMasterInfo";
import { useTimesMasterInfoQuery } from "@/entities/order/api/getTimesMasterInfo";
import { ROUTES } from "@/shared/const/Routes.ts";
import type { BookingData } from "@/shared/context/ClientProvider.tsx";
import { SvgIcon } from "@/shared/ui/SvgIcon/SvgIcon.tsx";
import { TimeBooking } from "@/view/TimesBooking/components/TimeBooking";

import styles from "./TimesBooking.module.scss";

const cx = cnBind.bind(styles);
type TimesBookingProps = {
    data?: BookingData;
    masterId?: string;
    handleAddWorkDateBooking?: (date: string, time: string) => void;
};
const formatDate = (dateString: string) => {
    const [day, month, year] = dateString.split("-");

    return `${year}-${month}-${day}`;
};
export const TimesBooking = ({ data, handleAddWorkDateBooking, masterId }: TimesBookingProps) => {
    const href = useNavigate();
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [dateTo, setDateTo] = useState<Date>(
        new Date(new Date().setDate(new Date().getDate() + 30)),
    );
    const masters = [
        {
            masterId: masterId || "",
            serviceId: data?.masterInfo?.services?.map((elem) => String(elem.id) || "") || [],
        },
    ];

    const { data: singleTimeDay, isPending: loadingSingleTimeDay } = useTimesMasterInfoQuery({
        masters,
        date: formatDate(selectedDate.toLocaleDateString().replace(/[.]/g, "-")),
    });
    const { data: allTimes } = useAllTimesMasterInfoQuery({
        masters,
        dateFrom: formatDate(selectedDate.toLocaleDateString().replace(/[.]/g, "-")),
        dateTo: formatDate(dateTo.toLocaleDateString().replace(/[.]/g, "-")),
    });

    useEffect(() => {
        if (selectedDate.toLocaleDateString() === dateTo.toLocaleDateString())
            setDateTo(new Date(new Date().setDate(selectedDate.getDate() + 30)));
    }, [dateTo, selectedDate]);
    const onSelectHandler = (date: Date) => setSelectedDate(date);
    const dateTrue = useMemo(() => allTimes?.dateTrue || [], [allTimes]);
    const listDateTimes = useMemo(() => singleTimeDay?.times || [], [singleTimeDay]);
    const onBooking = (time: string) => {
        href(ROUTES.ORDER);
        handleAddWorkDateBooking?.(
            formatDate(selectedDate.toLocaleDateString().replace(/[.]/g, "-")),
            time,
        );
    };

    return (
        <div className={cx("wrapper")}>
            <div className={cx("header")}>
                <span className={cx("title")}>Выберите дату и время</span>
                <div className={cx("master-name")}>
                    <span className={cx("name")}>{data?.masterInfo?.name}</span>
                </div>
            </div>
            <div className={cx("content")}>
                <Calendar isHeader={false} onChange={onSelectHandler} dateTrue={dateTrue} />
                {loadingSingleTimeDay ? null : listDateTimes.length === 0 ? (
                    <div className={cx("times-not")}>
                        <span className={cx("caption")}>
                            На {selectedDate.toLocaleDateString()} не записаться
                        </span>
                        <span className={cx("title")}>Выберите другую дату или услугу</span>
                        <div onClick={() => href(-1)} className={cx("back")}>
                            <SvgIcon name="back" />
                            <span>Вернуться к услугам</span>
                        </div>
                    </div>
                ) : (
                    <div className={cx("times")}>
                        <TimeBooking
                            onClick={onBooking}
                            time="11:45"
                            listTime={listDateTimes}
                            title="Утро"
                        />
                        <TimeBooking
                            onClick={onBooking}
                            time="12:00"
                            listTime={listDateTimes}
                            title="День"
                        />
                        <TimeBooking
                            onClick={onBooking}
                            time="18:00"
                            listTime={listDateTimes}
                            title="Вечер"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

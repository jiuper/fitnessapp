import { useState } from "react";
import cnBind from "classnames/bind";

import { Journal } from "@/components/Journal";
import type { GetMasterDto } from "@/entities/masters/types.ts";
import { useGetAllRecordQuery } from "@/entities/record/api/getAllRecord";
import type { UserRole } from "@/entities/user/types.ts";
import { Cartulary } from "@/view/CalendarPage/Cartulary";

import styles from "./CalendarPage.module.scss";

const cx = cnBind.bind(styles);
type CalendarPageProps = {
    userRole: UserRole.CLIENT | UserRole.MASTER | UserRole.ADMIN;
    listMaster?: GetMasterDto[];
};
export type filterDate = { type: string; value: number; title: string };
const filterViewWeek: filterDate[] = [
    { type: "days", value: 1, title: "День" },
    { type: "days", value: 3, title: "3 Дня" },
    { type: "weeks", value: 7, title: "Неделя" },
];
export const CalendarPage = ({ listMaster }: CalendarPageProps) => {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const onSelectHandler = (date: Date) => setSelectedDate(date);
    const { data: records } = useGetAllRecordQuery(
        selectedDate.toLocaleDateString().replace(/[.]/g, "-").split("-").reverse().join("-"),
    );

    const [filterViewDate, setFilterViewDate] = useState<filterDate>(filterViewWeek[2]);
    const onChaneFilter = (date: filterDate) => setFilterViewDate(date);

    return (
        <div className={cx("wrapper")}>
            <span className={cx("title")}>Журнал</span>
            <div className={cx("list")}>
                <Journal
                    filterViewWeek={filterViewWeek}
                    filterViewDate={filterViewDate}
                    onChaneFilter={onChaneFilter}
                    onChange={onSelectHandler}
                    dateTrue={[]}
                    listMaster={listMaster}
                    mode
                />
                <div className={cx("times")}>
                    <Cartulary viewSchedule={filterViewDate.value} records={records} mode={40} />
                </div>
            </div>
        </div>
    );
};

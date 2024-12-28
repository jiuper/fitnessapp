import { useMemo, useState } from "react";
import { Accordion } from "@telegram-apps/telegram-ui";
import { AccordionContent } from "@telegram-apps/telegram-ui/dist/components/Blocks/Accordion/components/AccordionContent/AccordionContent";
import { AccordionSummary } from "@telegram-apps/telegram-ui/dist/components/Blocks/Accordion/components/AccordionSummary/AccordionSummary";
import cnBind from "classnames/bind";

import styles from "./TimeBooking.module.scss";

const cx = cnBind.bind(styles);
type TimeBookingProps = {
    title: string;
    listTime: string[];
    time: string;
    onClick?: (time: string) => void;
};
export const TimeBooking = ({ listTime, title, time, onClick }: TimeBookingProps) => {
    const [selectedDate, setSelectedDate] = useState<boolean>(true);

    const titleTrue = useMemo(
        () =>
            listTime.some((el) =>
                title === "Утро" ? el <= time : title === "День" ? el >= time && el <= "17:45" : el >= time,
            )
                ? title
                : null,
        [listTime, time, title],
    );

    return (
        <div className={cx("time-booking")}>
            {titleTrue ? (
                <Accordion expanded={selectedDate} onChange={setSelectedDate}>
                    <AccordionSummary>{titleTrue}</AccordionSummary>
                    <AccordionContent className={cx("content")}>
                        <div className={cx("time")}>
                            {listTime.map((el) =>
                                (title === "Утро" && el <= time) ||
                                (title === "День" && el >= time && el <= "17:45") ||
                                (title === "Вечер" && el >= time) ? (
                                    <div onClick={() => onClick?.(el)} className={cx("item")} key={el}>
                                        <span className={cx("title")}>{el}</span>
                                    </div>
                                ) : null,
                            )}
                        </div>
                    </AccordionContent>
                </Accordion>
            ) : null}
        </div>
    );
};

import { createRef, useEffect, useState } from "react";
import cnBind from "classnames/bind";
import { DateTime } from "luxon";

import type { ResponseGetRecordShortInfoDto } from "@/entities/record/types.ts";
import { UserRole } from "@/entities/user/types.ts";
import { useModalContextMutate } from "@/shared/helper";
import { CardCalendar } from "@/view/CalendarPage/CardCalendar";
import { useCartulary } from "@/view/CalendarPage/Cartulary/useCartulary.ts";

import styles from "./Cartulary.module.scss";

const cx = cnBind.bind(styles);
type CartularyProps = {
    records?: ResponseGetRecordShortInfoDto[];
    viewSchedule: number;
    mode: UserRole.CLIENT | UserRole.MASTER | UserRole.ADMIN;
    workDate?: { start: number; end: number };
};

export const Cartulary = ({ records, viewSchedule, mode, workDate }: CartularyProps) => {
    const actualTimeRef = createRef<HTMLDivElement>();
    const [time, setTime] = useState(0);
    const filteredResult = useCartulary(records);
    const { openRecordAddModal } = useModalContextMutate();
    const [open, setOpen] = useState(false);
    const [feedBack, setFeedBack] = useState(false);
    const [indexRecord, setIndexRecord] = useState(0);

    useEffect(() => {
        const updateCurrentTime = () => {
            const now = DateTime.now();
            const currentMinutes = now.hour * 60 + now.minute;
            const startMinutes = (workDate?.start || 8) * 60;
            const endMinutes = (workDate?.end || 21) * 60;
            setTime(
                Math.max(0, Math.min(currentMinutes - startMinutes, endMinutes - startMinutes)),
            );
            actualTimeRef.current?.scrollIntoView({
                block: "center",
                inline: "nearest",
                behavior: "smooth",
            });
        };

        const interval = setInterval(updateCurrentTime, 1000 * 30);
        updateCurrentTime();

        return () => clearInterval(interval);
    }, [actualTimeRef, workDate]);

    const handleIsFeed = (index: number, isFeed: boolean = false) => {
        setOpen(!open);
        setIndexRecord(index);
        setFeedBack(isFeed);
    };

    return (
        <div className={cx("wrapper")}>
            <div className={cx("area")}>
                <div
                    ref={actualTimeRef}
                    className={cx("actualTime")}
                    style={{ top: `${time}px` }}
                />
                <div className={cx("timeline")}>
                    {filteredResult.map((el, index) => (
                        <div
                            key={index}
                            className={cx("time", el ? "actives" : "")}
                            style={{ color: "black" }}
                        >
                            {typeof el !== "number" ? (
                                <div
                                    className={cx(
                                        "time",
                                        open && (feedBack ? "isNotFeed" : "isFeed"),
                                    )}
                                >
                                    <span className={cx("item")}>{el?.start}</span>
                                    <span className={cx("item")}>{el?.end}</span>
                                </div>
                            ) : (
                                <span className={cx("item")}>{`${el}:00`}</span>
                            )}
                        </div>
                    ))}
                </div>
                <div className={cx("schedule")}>
                    {filteredResult.map((el, i) => {
                        const view = mode === UserRole.CLIENT ? 1 : viewSchedule;

                        if (typeof el === "number") {
                            return (
                                <div
                                    className={cx("cell")}
                                    key={i}
                                    onClick={
                                        mode === UserRole.CLIENT
                                            ? () => {}
                                            : () => openRecordAddModal()
                                    }
                                >
                                    {Array.from({ length: view }).map((_, index) => (
                                        <div className={cx("cell-row")} key={`${index}-${i}`} />
                                    ))}
                                </div>
                            );
                        }
                        const filteredRecords = records?.filter((_, i) => i === el.index);

                        return filteredRecords?.map((record, indexR) => (
                            <div
                                className={cx(
                                    "cell",
                                    indexRecord === i &&
                                        open &&
                                        (feedBack ? "isNotFeed" : "isFeed"),
                                )}
                                key={indexR}
                                onClick={() => handleIsFeed(i, true)}
                            >
                                {Array.from({ length: view }).map((_, index) =>
                                    indexR === index ? (
                                        <div
                                            key={index}
                                            className={cx(
                                                "cell-2",
                                                indexRecord === i &&
                                                    open &&
                                                    (feedBack ? "isNotFeed" : "isFeed"),
                                            )}
                                        >
                                            <CardCalendar
                                                id={record.id}
                                                caption={record.servicesName[0]}
                                                masterInfo={{
                                                    name: record.masterName,
                                                    image: record.masterImage,
                                                }}
                                                countServices={record.servicesName.length}
                                                isFeedback
                                            />
                                        </div>
                                    ) : (
                                        <div
                                            className={cx("cell-row")}
                                            key={`${index}-${i}`}
                                            onClick={
                                                mode === UserRole.CLIENT
                                                    ? () => {}
                                                    : () => openRecordAddModal()
                                            }
                                        />
                                    ),
                                )}
                            </div>
                        ));
                    })}
                </div>
            </div>
        </div>
    );
};

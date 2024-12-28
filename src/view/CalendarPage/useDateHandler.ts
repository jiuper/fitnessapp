import { useEffect, useMemo, useState } from "react";
import { eachDayOfInterval, endOfWeek, startOfDay, startOfWeek } from "date-fns";
import { DateTime, Info } from "luxon";

type DateInfo = {
    date: Date;
    dayOfWeek: string;
};
export const useDateHandler = (
    typeView?: string,
    valueView?: number,
    dateTrue?: string[],
    onChange?: (date: Date) => void,
    dateValue?: DateTime,
) => {
    const [dateTime, setDateTime] = useState<DateTime>(DateTime.now().startOf("day"));
    const [selectedDate, setSelectedDate] = useState(new Date());
    useEffect(() => {
        if (dateValue) setDateTime(dateValue);
    }, [dateValue]);

    const getDays = () => [...Info.weekdays("short")];

    const formatListDate = useMemo(
        () => (dateTrue ? dateTrue.map((el) => new Date(el).toLocaleDateString()) : []),
        [dateTrue],
    );

    const days = useMemo(() => getDays(), []);

    const startWeek = startOfWeek(dateTime.toISO() || new Date(), {
        weekStartsOn: 1,
    });
    const endWeek = endOfWeek(dateTime.toISO() || new Date(), { weekStartsOn: 1 });

    const getWeekDates = (): DateInfo[] => {
        return eachDayOfInterval({
            start: startWeek,
            end: endWeek,
        }).map((date) => ({
            date,
            dayOfWeek: new Date(date).toLocaleDateString("ru-RU", { weekday: "short" }),
        }));
    };

    const getDayOrThreeDates = (): DateInfo[] => {
        const day = startOfDay(dateTime.toISO() || new Date());

        return eachDayOfInterval({
            start: day,
            end: dateTime.plus({ days: valueView }).toISO() || new Date(),
        })
            .slice(0, [1, 3].includes(valueView || 1) ? valueView : 1)
            .map((date) => ({
                date,
                dayOfWeek: new Date(date).toLocaleDateString("ru-RU", { weekday: "short" }),
            }));
    };

    const date = useMemo(() => {
        if (valueView === 7) {
            return getWeekDates();
        }

        return getDayOrThreeDates();
    }, [startWeek, endWeek, valueView]);

    const onChangeDate = (operator = false) => {
        const type = typeView || "weeks";
        const value = valueView === 7 ? 1 : valueView;
        setDateTime(
            operator ? dateTime.minus({ [type]: value }) : dateTime.plus({ [type]: value }),
        );
    };

    const onSelectHandler = (date: Date) => {
        setSelectedDate(date);
        onChange?.(date);
    };

    return {
        selectedDate,
        days,
        date,
        formatListDate,
        onChangeDate,
        onSelectHandler,
    };
};

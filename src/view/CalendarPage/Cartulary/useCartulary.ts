import dayjs from "dayjs";

import type { ResponseGetRecordShortInfoDto } from "@/entities/record/types.ts";

const dateFormat = (
    records: ResponseGetRecordShortInfoDto[],
): { start: string; end: string; originalIndex: number }[] => {
    const newArr = records.map((el, index) => {
        const start = dayjs(el?.datetime || "")
            .locale("ru")
            .format("HH:mm");
        const end = dayjs(el?.datetime)
            .add(el?.duration || 30, "minutes")
            .locale("ru")
            .format("HH:mm");

        return { start, end, originalIndex: index };
    });

    return newArr.reduce<{ start: string; end: string; originalIndex: number }[]>((acc, cur) => {
        const isUnique = !newArr.some((item) => item.start === cur.start && item.end > cur.end);
        const noOverlap = !acc.some((item) => item.end > cur.start);

        if (isUnique && noOverlap) {
            acc.push(cur);
        }

        return acc;
    }, []);
};

export const useCartulary = (
    records: ResponseGetRecordShortInfoDto[] | undefined,
    workDate?: { start: number; end: number },
) => {
    const hours = Array.from({ length: 24 }, (_, i) => i).filter(
        (hour) => hour >= (workDate?.start || 8) && hour <= (workDate?.end || 21),
    );

    // Функция для преобразования времени в часы
    const timeToHours = (time: string): number => {
        const [hours, minutes] = time.split(":").map(Number);

        return hours + minutes / 60;
    };

    // Преобразуем время окончания в часы
    const endHours = dateFormat(records || []).map((range) => ({
        start: timeToHours(range.start),
        end: timeToHours(range.end),
        index: range.originalIndex,
    }));

    const formatTime = (time: number) => {
        const hours = Math.floor(time);
        const minutes = Math.floor((time % 1) * 60);

        return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
    };

    const result = hours.map((hour) => {
        const interval = endHours.find(({ start, end }) => hour >= start && hour <= end);

        return interval
            ? {
                  start: formatTime(interval.start),
                  end: formatTime(interval.end),
                  index: interval.index,
              }
            : hour;
    });
    const uniqueIntervals = new Set();

    return result.filter((item) => {
        if (typeof item !== "object") return true;

        const key = `${item.start}-${item.end}`;

        if (uniqueIntervals.has(key)) return false;

        uniqueIntervals.add(key);

        return true;
    });
};

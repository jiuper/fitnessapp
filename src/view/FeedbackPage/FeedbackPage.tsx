import cnBind from "classnames/bind";

import { SvgIcon } from "@/shared/ui/SvgIcon/SvgIcon.tsx";
import type { FeedbackCardProps } from "@/view/FeedbackPage/components/FeedbackCard";
import { FeedbackCard } from "@/view/FeedbackPage/components/FeedbackCard";

import styles from "./FeedbackPage.module.scss";

const cx = cnBind.bind(styles);
type FeedbackPageProps = {};
export const FeedbackPage = ({}: FeedbackPageProps) => {
    const list: FeedbackCardProps[] = [
        {
            name: "Дмитрий Щербаков",
            service: "Силовая показатели",
            id: "1",
            rating: 4.5,
            dateTime: "2022-08-12 12:12",
            description: "Хороший тренер! Лучшая тренировка",
        },
        {
            name: "Дмитрий Щербаков",
            service: "Силовая показатели",
            id: "1",
            rating: 4.5,
            dateTime: "2022-08-12 12:12",
            description: "Хороший тренер! Лучшая тренировка",
        },
        {
            name: "Дмитрий Щербаков",
            service: "Силовая показатели",
            id: "1",
            rating: 4.5,
            dateTime: "2022-08-12 12:12",
            description: "Хороший тренер! Лучшая тренировка",
        },
    ];

    const countRating = list.length * 4.5;
    const countFeedback = list.length;

    return (
        <div className={cx("wrapper", "container")}>
            <div className={cx("header")}>
                <h2 className={cx("title")}>Отзывы</h2>
                <div className={cx("rating-counter")}>
                    <div className={cx("rating")}>
                        <SvgIcon className={cx("icon")} name="rating" />
                        <span>{4.5}</span>
                    </div>
                    <div className={cx("counter")}>
                        <span>{countRating} оценок</span>
                        <span>{countFeedback} отзывов</span>
                    </div>
                </div>
            </div>

            <div className={cx("list")}>
                {list.map((el) => (
                    <FeedbackCard key={el.id} {...el} />
                ))}
            </div>
        </div>
    );
};

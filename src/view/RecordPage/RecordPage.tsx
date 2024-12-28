import type { JSX } from "react";
import { useNavigate } from "react-router";
import cnBind from "classnames/bind";
import dayjs from "dayjs";

import { useRemoveRecord } from "@/entities/record/api/removeRecord/removeRecordApi.ts";
import type { Record } from "@/entities/record/types.ts";
import notFound from "@/shared/assets/images/Empty-image-icon.png";
import { ROUTES } from "@/shared/const/Routes.ts";
import { Button } from "@/shared/ui/_Button";
import { LinkGroup } from "@/view/IndexPage/components/LinkGroup";
import { CardOrder } from "@/view/OrderPage/components/CardOrder";

import "dayjs/locale/ru";

import styles from "./RecordPage.module.scss";

const cx = cnBind.bind(styles);
type RecordPageProps = {
    data?: Record | null;
};
export const dateFormat = (time: string, duration: number): JSX.Element => {
    const start = dayjs(time).locale("ru");
    const end = dayjs(time).add(duration, "minutes").locale("ru");

    return (
        <>
            <span className={cx("date")}>{start.format("DD MMMM, dddd")}</span>
            <span
                className={cx("time")}
            >{`${start.format("HH:mm")} - ${end.format("HH:mm")}`}</span>
        </>
    );
};
export const RecordPage = ({ data }: RecordPageProps) => {
    const href = useNavigate();
    const { mutate: removeRecord } = useRemoveRecord();
    const listLink = [
        { name: "Перенести", href: ROUTES.TIMESBOOKING, icon: "more_time" },
        {
            name: "Отменить",
            icon: "highlight_off",
            href: ROUTES.MAIN,
            onClick: () => removeRecord(""),
        },
        { name: "Еще запись", icon: "add-record", href: ROUTES.BOOKING },
        { name: "Календарь", icon: "Calendar", href: ROUTES.CALENDAR },
    ];

    return (
        <div className={cx("wrapper", "container")}>
            <div className={cx("title")}>
                <span>Ваша запись</span>
            </div>
            <div className={cx("cards")}>
                <div className={cx("list")}>
                    <CardOrder
                        icon="ArrowRight"
                        rating="4.9"
                        avatar={notFound}
                        name="Денис Иванов"
                        post="Тренер"
                        onClick={() => href(`${ROUTES.MASTER}/${data?.staff?.id}`)}
                    />

                    <CardOrder avatar={notFound} name={data?.trainingType.name} post="60 мин" />
                </div>
                <div className={cx("card")}>
                    <span>Александ Иванов</span>
                    <div className={cx("phone")}>
                        <span>+7 (999) 999-99-99</span>
                    </div>
                </div>
                <LinkGroup listLink={listLink} />
            </div>
            <div className={cx("main")}>
                <Button label="Главная" className={cx("btn")} onClick={() => href(ROUTES.MAIN)} />
            </div>
        </div>
    );
};

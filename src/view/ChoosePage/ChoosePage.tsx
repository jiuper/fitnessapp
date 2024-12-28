import cnBind from "classnames/bind";

import booking from "@/shared/assets/booking.png";
import services from "@/shared/assets/services.png";
import { ROUTES } from "@/shared/const/Routes.ts";
import { Link } from "@/shared/ui/Link/Link.tsx";
import { SvgIcon } from "@/shared/ui/SvgIcon/SvgIcon.tsx";

import styles from "./ChoosePage.module.scss";

const cx = cnBind.bind(styles);
export const ChoosePage = () => {
    const list = [
        {
            title: "Тренера",
            desc: "Вы можете выбрать одного из доступных тренеров, после чего перейдите к выбору типа тренеровки",
            src: booking,
            href: ROUTES.BOOKING,
        },
        {
            title: "Тип тренеровки",
            desc: "Выберите тип тренеровки, чтобы записаться",
            src: services,
            href: ROUTES.SERVICES,
        },
    ];

    return (
        <div className={cx("wrapper", "container")}>
            <h2 className={cx("title")}>Записаться</h2>
            <div className={cx("list")}>
                {list.map(({ title, desc, src, href }, i) => (
                    <Link key={i} to={href} onClick={() => {}} className={cx("card")}>
                        <img className={cx("avatar")} src={src} alt="img" />
                        <div className={cx("info")}>
                            <span className={cx("name")}>{title}</span>
                            <span className={cx("post")}>{desc}</span>
                        </div>
                        <SvgIcon name="ArrowRight" className={cx("arrow")} />
                    </Link>
                ))}
            </div>
        </div>
    );
};

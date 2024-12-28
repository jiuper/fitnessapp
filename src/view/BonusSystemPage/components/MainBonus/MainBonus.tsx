import { useNavigate } from "react-router";
import cnBind from "classnames/bind";

import { ButtonsAction } from "@/components/ButtonsAction";
import { ROUTES } from "@/shared/const/Routes.ts";
import { SvgIcon } from "@/shared/ui/SvgIcon/SvgIcon.tsx";

import styles from "./MainBonus.module.scss";

const cx = cnBind.bind(styles);

export const MainBonus = () => {
    const href = useNavigate();

    const listBonus = [
        { title: "Бонус за подписку", url: `${ROUTES.BONUS}/discount` },
        { title: "Получайте бонусы с дисконтной картой", url: `${ROUTES.BONUS}/friends` },
        { title: "Приглашайте друзей и получайте бонусы", url: `${ROUTES.BONUS}/rules` },
    ];

    return (
        <div className={cx("main-bonus")}>
            <div className={cx("wrapper", "container")}>
                <div className={cx("info")}>
                    {listBonus.map((el, i) => (
                        <div onClick={() => href(el.url)} key={i} className={cx("item")}>
                            <span className={cx("name")}>{el.title}</span>
                            <SvgIcon name="ArrowRight" className={cx("arrow")} />
                        </div>
                    ))}
                </div>
                <ButtonsAction
                    isOpen
                    onClose={() => href("/")}
                    btnLabel={["Вести промокод", "Выход"]}
                />
            </div>
        </div>
    );
};

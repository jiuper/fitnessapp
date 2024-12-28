import { useNavigate } from "react-router";
import { Avatar } from "@telegram-apps/telegram-ui";
import cnBind from "classnames/bind";

import { ButtonsAction } from "@/components/ButtonsAction";
import def from "@/shared/assets/images/Empty-image-icon.png";
import { ROUTES } from "@/shared/const/Routes.ts";
import { InputText } from "@/shared/ui/_InputText";
import { SvgIcon } from "@/shared/ui/SvgIcon/SvgIcon.tsx";

import styles from "./ProfileSetting.module.scss";

const cx = cnBind.bind(styles);

const listSetting = [
    { title: "Кабинет", url: `${ROUTES.SETTING}/company` },
    { title: "Услуги", url: `${ROUTES.SETTING}/services` },
    { title: "Персонал", url: `${ROUTES.SETTING}/personal` },
    { title: "Бонусы", url: `${ROUTES.SETTING}/bonus` },
];

export const ProfileSetting = () => {
    const href = useNavigate();

    return (
        <div className={cx("profile-setting")}>
            <div className={cx("wrapper")}>
                <div className={cx("header")}>
                    <div className={cx("avatar")}>
                        <Avatar size={96} src={def} />
                    </div>
                    <div className={cx("short-info")}>
                        <span className={cx("name")}>Анастасия Иванова</span>
                        <span className={cx("post")}>Администратор</span>
                    </div>
                </div>
                <div className={cx("account")}>
                    <span className={cx("title")}>Аккаунт</span>
                    <div className={cx("info")}>
                        <InputText
                            isFullWidth
                            label="ФИО"
                            value="Иванова Анастасия Ивановна"
                            disabled
                        />
                        <InputText isFullWidth label="Должность" value="Администратор" disabled />
                    </div>
                </div>
                <div className={cx("setting")}>
                    <span className={cx("title")}>Настройки</span>
                    <div className={cx("info")}>
                        {listSetting.map((el, i) => (
                            <div onClick={() => href(el.url)} key={i} className={cx("item")}>
                                <span className={cx("name")}>{el.title}</span>
                                <SvgIcon name="ArrowRight" className={cx("arrow")} />
                            </div>
                        ))}
                    </div>
                </div>
                <ButtonsAction isOpen onClose={() => href("/")} btnLabel={["", "Выход"]} />
            </div>
        </div>
    );
};

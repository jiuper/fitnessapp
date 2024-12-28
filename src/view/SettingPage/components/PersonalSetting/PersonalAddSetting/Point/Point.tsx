import { Avatar } from "@telegram-apps/telegram-ui";
import cnBind from "classnames/bind";
import type { InputSwitchChangeEvent } from "primereact/inputswitch";

import { InputSwitch } from "@/shared/ui/_InputSwitch";

import styles from "./Point.module.scss";

const cx = cnBind.bind(styles);
type PointProps = {
    title: string;
    value: boolean;
    onChange?: (event: InputSwitchChangeEvent) => void;
    icon?: string;
    name?: string;
};
export const Point = ({ title, icon, onChange, value, name }: PointProps) => {
    return (
        <div className={cx("point")}>
            {icon && <Avatar size={40} className={cx("icon")} src={icon} alt={title} />}
            <span className={cx("title")}>{title}</span>
            <InputSwitch name={name} onChange={onChange} checked={value} />
        </div>
    );
};

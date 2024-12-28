import { Badge } from "@telegram-apps/telegram-ui";
import cnBind from "classnames/bind";
import { Image } from "primereact/image";

import avatar from "@/shared/assets/Avatar.png";

import styles from "./CardStaff.module.scss";

const cx = cnBind.bind(styles);
type CardOrderProps = {
    name?: string | JSX.Element;
    gym?: string;
    onClick?: () => void;
};
export const CardStaff = ({ gym, name, onClick }: CardOrderProps) => {
    return (
        <div className={cx("wrapper")} onClick={onClick}>
            <div className={cx("avatar-container")}>
                <Image
                    width="96px"
                    height="96px"
                    className={cx("avatar")}
                    src={avatar}
                    alt="avatar"
                />
                <Badge className={cx("badge")} type="number">
                    4.9
                </Badge>
            </div>
            <div className={cx("body")}>
                <span className={cx("name")}>{name}</span>
                <span className={cx("post")}>{gym}</span>
            </div>
        </div>
    );
};

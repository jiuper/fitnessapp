import cnBind from "classnames/bind";
import { Image } from "primereact/image";

import avatar from "@/shared/assets/Avatar@2x.png";
import { SvgIcon } from "@/shared/ui/SvgIcon/SvgIcon.tsx";

import styles from "./CardGym.module.scss";

const cx = cnBind.bind(styles);
type CardOrderProps = {
    name?: string | JSX.Element;
    address?: string;
    schedule?: string;
    onClick?: () => void;
};
export const CardGym = ({ address, schedule, name, onClick }: CardOrderProps) => {
    return (
        <div className={cx("wrapper")} onClick={onClick}>
            <div className={cx("header")}>
                <div className={cx("avatar-container")}>
                    <Image
                        width="88px"
                        height="88px"
                        className={cx("avatar")}
                        src={avatar}
                        alt="avatar"
                    />
                </div>
            </div>
            <div className={cx("body")}>
                <div className={cx("info")}>
                    <div className={cx("name")}>{name}</div>
                    <div className={cx("post-wrapper")}>
                        <div className={cx("post")}>
                            <SvgIcon className={cx("post-icon")} name="location" />
                            <span className={cx("post-text")}>{address}</span>
                        </div>
                        <div className={cx("post")}>
                            <SvgIcon className={cx("post-icon")} name="watch" />
                            <span className={cx("post-text")}>{schedule}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

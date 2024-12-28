import { Badge } from "@telegram-apps/telegram-ui";
import cnBind from "classnames/bind";
import { Image } from "primereact/image";

import { ButtonIcon } from "@/shared/ui/_ButtonIcon";
import { SvgIcon } from "@/shared/ui/SvgIcon/SvgIcon.tsx";

import styles from "./CardOrder.module.scss";

const cx = cnBind.bind(styles);
type CardOrderProps = {
    avatar?: string;
    name?: string | JSX.Element;
    post?: string;
    onClick?: () => void;
    icon?: string;
    rating?: string;
    price?: string;
};
export const CardOrder = ({ post, avatar, name, icon, onClick, rating, price }: CardOrderProps) => {
    return (
        <div className={cx("wrapper")} onClick={onClick}>
            {avatar && (
                <div className={cx("header")}>
                    <div className={cx("avatar-container")}>
                        <Image
                            width="80px"
                            height="80px"
                            className={cx("avatar")}
                            src={avatar}
                            alt="avatar"
                        />
                        {rating && (
                            <Badge className={cx("badge")} type="number">
                                {rating}
                            </Badge>
                        )}
                    </div>
                </div>
            )}
            <div className={cx("body")}>
                <div className={cx("info")}>
                    <div className={cx("name")}>{name}</div>
                    <div className={cx("post-wrapper")}>
                        <span className={cx("post")}>{post}</span>
                        {price && <span className={cx("post")}>{price}</span>}
                    </div>
                </div>

                <ButtonIcon
                    onClick={onClick}
                    color="empty"
                    className={cx("button")}
                    icon={<SvgIcon className="icon" name={icon || ""} />}
                />
            </div>
        </div>
    );
};

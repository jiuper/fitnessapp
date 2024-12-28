import cnBind from "classnames/bind";
import { Image } from "primereact/image";

import { SvgIcon } from "@/shared/ui/SvgIcon/SvgIcon.tsx";

import styles from "./MasterInfoCard.module.scss";

const cx = cnBind.bind(styles);
type MasterInfoCard = {
    id?: string;
    image?: string;
    name?: string;
    post?: string;
    onClick?: (id?: string) => void;
};
export const MasterInfoCard = ({ id, post, name, image, onClick }: MasterInfoCard) => {
    return (
        <div onClick={() => onClick?.(id)} className={cx("card")}>
            <Image width="64px" height="64px" className={cx("avatar")} src={image} alt="avatar" />
            <div className={cx("info")}>
                <span className={cx("name")}>{name}</span>
                <span className={cx("post")}>{post}</span>
            </div>
            <SvgIcon name="ArrowRight" className={cx("arrow")} />
        </div>
    );
};
